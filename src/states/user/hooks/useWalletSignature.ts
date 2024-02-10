import { useCallback, useState } from 'react';
import { Address, useAccount, useSignMessage } from 'wagmi';
import { times } from 'lodash';
import { useTranslation } from '@/localization';
import { logError } from '@/utils/sentry';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';

export enum LoadingStatus {
    IDLE = 'IDLE',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAIL = 'fail'
}

function randomHex(size: number) {
    return times(size)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
}

export function useWalletSignature() {
    const { t } = useTranslation();
    const { address, connector } = useAccount();
    const { signMessageAsync: signMessageWagmi, reset: resetWagmi } = useSignMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);

    const signMessage = useCallback(async ({ text, onSignature }: {
        text: string,
        onSignature?: (data: {
            address: Address,
            message: string,
            signature: string
        }) => Promise<any>
    }) => {
        try {
            if (loading) {
                return;
            }

            if (!address || !connector) {
                throw new Error('signMessage called unnecessary!');
            }

            setLoading(true);

            const nonce = randomHex(32);
            const message = `${text} \n\n Nonce: ${nonce}`;

            const signature = await signMessageWagmi({ message });

            await onSignature?.({
                address,
                message,
                signature
            });

            setStatus(LoadingStatus.SUCCESS);
        } catch (error) {
            setError(walletErrorToUserReadableMessage(error, t));
            setStatus(LoadingStatus.FAIL);
            logError(error);
        } finally {
            setLoading(false);
        }
    }, [address, connector, loading, signMessageWagmi, setStatus, setError, setLoading, t]);

    const reset = useCallback(() => {
        resetWagmi();
        setError(undefined);
        setStatus(LoadingStatus.IDLE);
    }, [resetWagmi, setError, setStatus]);

    return {
        status,
        error,
        loading,
        reset,
        signMessage
    };
}