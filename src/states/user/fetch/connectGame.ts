import { Address } from 'viem';
import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

type ConnectGameResponse = { status?: 'ok' };

export async function connectGame(params: {
    gameValue: string,
    gameHash: string,
    address: Address,
    message: string,
    signature: string
}): Promise<ConnectGameResponse> {
    if (MOCK_API_CALLS) {
        return { status: 'ok' };
    }

    const { address, message, signature, gameHash, gameValue } = params;
    const { data } = await api.post<ConnectGameResponse>('/game/api/auth.web3', {
        key: gameValue,
        hash: gameHash,
        address,
        message,
        signature
    });

    return data;
}