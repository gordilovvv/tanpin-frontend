import { useCallback, useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import { mutate } from 'swr';
import { fetchLocks } from './fetch';
import { useClaimStore } from './store';
import { useTranslation } from '@/localization';
import { logError } from '@/utils/sentry';
import { NORMAL_INTERVAL } from '@/config/constants';
import { Address } from 'viem';

export function useLocksFetch(address: Address) {
    const { t } = useTranslation();
    const locks = useClaimStore(state => state.locks);
    const setLocks = useClaimStore(state => state.setLocks);

    const { data, isLoading, error } = useSWRImmutable(
        [`fetch.locks.${address}`],
        () => fetchLocks(address),
        {
            refreshInterval: NORMAL_INTERVAL,
            revalidateOnFocus: true
        }
    );

    let formattedError: string | undefined;

    if (error) {
        formattedError = t('Something went wrong while loading locks. Please try reloading the page');
    }

    useEffect(() => {
        if (data) {
            setLocks(data);
        }

        return () => setLocks(undefined);
    }, [data]);

    useEffect(() => {
        if (error) {
            logError(error);
        }
    }, [error]);

    return {
        error: formattedError,
        isLoading: !locks && isLoading
    };
}

export function useLocksRefetch(address: Address) {
    const refetchLocks = useCallback(async () => {
        return mutate([`fetch.locks.${address}`]);
    }, []);

    return { refetchLocks };
}