import useSWR from 'swr';
import { ACTIVITY_REFRESH_INTERVAL } from '@/config/constants/nft';
import { fetchActivity } from '../fetch/fetchActivity';
import { ActivityFilter, ActivityTransaction } from '../types';
import { ActivityType, useActivityStore } from '../store';


export function useActivity(filter: ActivityFilter) {
    const setActivityList = useActivityStore(state=>state.setActivityList);

    const type = typeof filter.tokenID === 'undefined' ? ActivityType.USER: ActivityType.TOKEN;

    const {  isLoading, error } = useSWR<ActivityTransaction[] | undefined>(
        ['activity', filter],
        async () => {
            const activity = await fetchActivity({filter});

            setActivityList(type, activity);

            return activity;
        },
        {
            dedupingInterval: ACTIVITY_REFRESH_INTERVAL, //rename activity
            refreshInterval: ACTIVITY_REFRESH_INTERVAL
        }
    );

    return {
        isLoading,
        error
    };
}
