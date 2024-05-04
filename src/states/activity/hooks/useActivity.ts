import { useEffect } from 'react';
import useSWR from 'swr';
import { fetchActivity } from '../fetch/fetchActivity';
import { useActivityStore } from '../store';
import { ActivityCategory, ActivityFilter, ActivityTransaction } from '../types';

// TODO: limit & offset
export function useActivity(category: ActivityCategory, filter: ActivityFilter) {
    const cacheKey = `${category}:${filter.tokenID ?? '_'}:${filter.address ?? '_'}:${filter.types.join(';')}`;
    const setActivityList = useActivityStore(state => state.setActivityList);

    const { data, isLoading, error } = useSWR<ActivityTransaction[] | undefined>(
        cacheKey,
        async () => fetchActivity({ filter, category }),
        { refreshInterval: 30_000 }
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
