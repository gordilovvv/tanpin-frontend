import { useCallback, useRef, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { useUserStore } from '../store';
import { loginWeb3 } from '../fetch/loginWeb3';
import { POLICY_URL, TERMS_URL } from '@/config';
import { times } from 'lodash';
import { logError } from '@/utils/sentry';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';

function randomHex(size: number) {
    return times(size)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
}

export enum LoadingStatus {
    IDLE = 'IDLE',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAIL = 'fail'
}

/**
 * Хук подписи сообщения входа, для того чтобы убедиться что юзер действительно владеет кошельком. Бекенд проверит подпись и будет уверен, что это истинный владелец.
 */
export function useWalletSignature() {
    const { address, connector } = useAccount();
    const { signMessageAsync: signMessageWagmi, reset: resetWagmi } = useSignMessage();
    const setUser = useUserStore(state => state.setUser);
    const isLoading = useRef<boolean>(false);
    const isPreparing = address && !connector;
    const [error, setError] = useState<string | undefined>();
    const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);

    const signLoginMessage = useCallback(async () => {
        try {
            if (isLoading.current) {
                return;
            }

            if (!address || !connector) {
                throw new Error('signMessage called unnecessary!');
            }

            isLoading.current = true;

            const nonce = randomHex(32);
            const message = `I accept the Tanpin Terms of Service ${TERMS_URL} and Privacy Policy ${POLICY_URL}. \n\n Nonce: ${nonce}`;

            const signature = await signMessageWagmi({ message });
            const { accessToken, rulesAccept } = await loginWeb3({
                address,
                message,
                signature
            });

            setStatus(LoadingStatus.SUCCESS);
            setUser(accessToken, rulesAccept);
        } catch (error) {
            setStatus(LoadingStatus.FAIL);
            setError(walletErrorToUserReadableMessage(error));
            logError(error);
        } finally {
            isLoading.current = false;
        }
    }, [address, connector, isLoading, signMessageWagmi, setStatus, setUser, setError]);

    const reset = useCallback(() => {
        resetWagmi();
        setStatus(LoadingStatus.IDLE);
    }, [resetWagmi, setStatus]);

    return {
        isPreparing,
        status,
        error,
        reset,
        signLoginMessage
    };
}