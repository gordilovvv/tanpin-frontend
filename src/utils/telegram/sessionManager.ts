import axios, { AxiosResponse } from 'axios';
import { generatePrivateKey } from 'viem/accounts';
import { getPublic, sign, decryptData, encryptData } from 'client-server-cipher-v2';
import { Buffer } from 'buffer';
import { keccak256 } from 'viem';

const request = async <T>(
    method: 'GET' | 'POST',
    url: string,
    data?: any,
): Promise<AxiosResponse<T>> => {
    const response = await axios({
        method,
        url,
        data
    });

    return response;
};

export const generateRandomSessionKey = () => {
    return generatePrivateKey().slice(2); // 0x000 -> 000
};

export const createSession = async <T>(authUrl: string) => {
    return request<T>('GET', authUrl);
};

export const authorizeSession = async <T>(params: {
    sessionId: string,
    sessionBaseUrl: string
}) => {
    const { sessionId, sessionBaseUrl } = params;

    const sessionPubKey = getPublic(Buffer.from(sessionId, 'hex')).toString('hex');
    const url = new URL(`${sessionBaseUrl}/session/get`);

    url.searchParams.append('pubKey', sessionPubKey);

    const { data: result } = await request<{
        str: string | undefined
    }>('GET', url.toString());

    if (!result.str) {
        throw new Error('Session bad or expired!');
    }

    const response = await decryptData<T & { error?: string }>(
        sessionId,
        result.str
    );

    if (response.error) {
        throw new Error('Encrypt data was failed!');
    }

    return response;
};

// invalidateSession
export const destroySession = async (params: {
    sessionId: string,
    sessionBaseUrl: string
}) => {
    const {
        sessionId,
        sessionBaseUrl
    } = params;

    const sessionPrivKey = Buffer.from(sessionId, 'hex');
    const sessionPubKey = getPublic(sessionPrivKey).toString('hex');
    const encData = await encryptData(sessionId, { revoked: true });
    const message = keccak256(Buffer.from(encData, 'utf8')).slice(2); // 0x000 -> 000
    const signature = (await sign(sessionPrivKey, Buffer.from(message, 'hex'))).toString('hex');

    await request('POST', `${sessionBaseUrl}/session/set`, {
        pubKey: sessionPubKey,
        str: encData,
        signature
    });
};