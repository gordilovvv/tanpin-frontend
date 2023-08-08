import { useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import { fetchActivity } from '../fetch/fetchActivity';
import { useActivityStore } from '../store';
import { ActivityFilter, ActivityTransaction } from '../types';
import { NORMAL_INTERVAL } from '@/config/constants';

export function useActivity(fetchKey: string, filter: ActivityFilter) {
    const cacheKey = `${fetchKey}.${filter.tokenID ?? 'no-token'}.${filter.userAddress ?? 'no-address'}.${filter.types.join(';')}`;
    const setActivityList = useActivityStore(state => state.setActivityList);

    const { data, isLoading, error } = useSWRImmutable<ActivityTransaction[] | undefined>(
        cacheKey,
        async () => fetchActivity({ filter }),
        {
            revalidateOnFocus: true,
            dedupingInterval: NORMAL_INTERVAL,
            refreshInterval: NORMAL_INTERVAL
        }
    );

    useEffect(() => {
        setActivityList(data);
    }, [data]);

    useEffect(() => {
        return () => {
            setActivityList(undefined);
        };
    }, []);

    return {
        isLoading,
        error
    };
}
