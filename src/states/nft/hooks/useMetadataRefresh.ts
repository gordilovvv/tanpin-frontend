import { AxiosError } from 'axios';
import { useToast } from '@/uikit';
import { useCallback, useState } from 'react';
import { useTranslation } from '@/localization';
import { useNFTRefetch } from './useNFTFetch';
import { refreshMetadata } from '../fetch/refreshMetadata';

export enum RefreshStatus {
    IDLE = 'idle',
    PENDING = 'pending',
    REJECTED = 'rejected',
    FULFILLED = 'fulfilled'
}

export function useMetadataRefresh(contractAddress: `0x${string}`, tokenID: string) {
    const { t } = useTranslation();
    const { toastLoading } = useToast();
    const { refetchNFT } = useNFTRefetch(contractAddress, tokenID);
    const [error, setError] = useState<string | undefined>();
    const [status, setStatus] = useState<RefreshStatus>(RefreshStatus.IDLE);

    const refreshTokenMetadata = useCallback(async () => {
        if (status === RefreshStatus.PENDING) {
            return;
        }

        // Добавляем задержку 1 сек, чтобы не прыгал тост
        const request = new Promise((resolve, reject) => {
            setTimeout(() => {
                refreshMetadata(contractAddress, tokenID)
                    .then(resolve)
                    .catch(reject);
            }, 1_000);
        })
            .then(() => {
                refetchNFT();
                setStatus(RefreshStatus.FULFILLED);
            })
            .catch(error => {
                setStatus(RefreshStatus.REJECTED);

                if (error instanceof AxiosError && error.response?.status === 429) {
                    setError(t('Metadata refresh too frequently. Please try again later.'));
                } else {
                    setError(t('Something went wrong!'));
                }
            });

        setStatus(RefreshStatus.PENDING);
        toastLoading(t('Reloading Metadata...'), request);
    }, [status, contractAddress, tokenID, setStatus, setError, toastLoading, t]);

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