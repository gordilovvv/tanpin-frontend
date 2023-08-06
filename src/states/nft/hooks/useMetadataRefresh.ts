import { AxiosError } from 'axios';
import { useToast } from '@/uikit';
import { useCallback, useState } from 'react';
import { refreshMetadata } from '../fetch/refreshMetadata';

export enum RefreshStatus {
    IDLE = 'idle',
    PENDING = 'pending',
    REJECTED = 'rejected',
    FULFILLED = 'fulfilled'
}

export function useMetadataRefresh(nftID: string) {
    const { toastLoading } = useToast();
    const [error, setError] = useState<string | undefined>();
    const [status, setStatus] = useState<RefreshStatus>(RefreshStatus.IDLE);

    const refreshTokenMetadata = useCallback(async () => {
        if (status === RefreshStatus.PENDING) {
            return;
        }

        // Добавляем задержку 1 сек, чтобы не прыгал тост
        const request = new Promise((resolve, reject) => {
            setTimeout(() => {
                refreshMetadata(nftID)
                    .then(resolve)
                    .catch(reject);
            }, 1_000);
        })
            .then(() => {
                setStatus(RefreshStatus.FULFILLED);
            })
            .catch(error => {
                setStatus(RefreshStatus.REJECTED);

                if (error instanceof AxiosError && error.response?.status === 429) {
                    setError('Metadata refresh too frequently. Please try again later.');
                } else {
                    setError('Something went wrong.');
                }
            });

        setStatus(RefreshStatus.PENDING);
        toastLoading('Reloading Metadata...', request);
    }, [status, nftID, setStatus, setError, toastLoading]);

    const resetState = useCallback(() => {
        setError(undefined);
        setStatus(RefreshStatus.IDLE);
    }, [setError, setStatus]);

    return {
        status,
        error,
        resetState,
        refreshTokenMetadata
    };
}