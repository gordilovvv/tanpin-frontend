import { useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import { fetchActivity } from '../fetch/fetchActivity';
import { useActivityStore } from '../store';
import { ActivityCategory, ActivityFilter, ActivityTransaction } from '../types';
import { SLOW_INTERVAL } from '@/config/constants';

// TODO: limit & offset
export function useActivity(category: ActivityCategory, filter: ActivityFilter) {
    const cacheKey = `${category}:${filter.tokenID ?? '_'}:${filter.address ?? '_'}:${filter.types.join(';')}`;
    const setActivityList = useActivityStore(state => state.setActivityList);

    const { data, isLoading, error } = useSWRImmutable<ActivityTransaction[] | undefined>(
        cacheKey,
        async () => fetchActivity({ filter, category }),
        { revalidateOnFocus: true, refreshInterval: SLOW_INTERVAL }
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
