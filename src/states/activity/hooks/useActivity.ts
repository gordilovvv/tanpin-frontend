import useSWRImmutable from 'swr/immutable';
import { fetchActivity } from '../fetch/fetchActivity';
import { useActivityStore } from '../store';
import { ActivityFilter, ActivityTransaction } from '../types';
import { NORMAL_INTERVAL } from '@/config/constants';

export function useActivity(filter: ActivityFilter) {
    const setActivityList = useActivityStore(state => state.setActivityList);

    const { isLoading, error } = useSWRImmutable<ActivityTransaction[] | undefined>(
        ['activity', filter],
        async () => {
            const activity = await fetchActivity({ filter });

            setActivityList(activity);

            return activity;
        },
        {
            dedupingInterval: NORMAL_INTERVAL,
            refreshInterval: NORMAL_INTERVAL
        }
    );

    return {
        isLoading,
        error
    };
}
