import useSWRImmutable from 'swr/immutable';
import { fetchActivity } from '../fetch/fetchActivity';
import { ActivityFilter, ActivityTransaction } from '../types';
import { ActivitySection, useActivityStore } from '../store';
import { ACTIVITY_REFRESH_INTERVAL } from '@/config/constants/nft';

export function useActivity(filter: ActivityFilter) {
    const setActivityList = useActivityStore(state => state.setActivityList);

    const type = typeof filter.tokenID === 'undefined' ? ActivitySection.USER : ActivitySection.TOKEN;

    const { isLoading, error } = useSWRImmutable<ActivityTransaction[] | undefined>(
        ['activity', filter.tokenID, filter.types, filter.userAddress],
        async () => {
            const activity = await fetchActivity({ filter });

            setActivityList(type, activity);

            return activity;
        },
        {
            dedupingInterval: ACTIVITY_REFRESH_INTERVAL,
            refreshInterval: ACTIVITY_REFRESH_INTERVAL
        }
    );

    return {
        isLoading,
        error
    };
}
