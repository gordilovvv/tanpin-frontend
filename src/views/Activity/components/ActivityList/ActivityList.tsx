import { ActivityCard, ActivityCardSkeleton } from '@/components/Activity';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useActivity } from '@/states/activity/hooks/useActivity';
import { useActivityStore } from '@/states/activity/store';
import { ActivityType } from '@/states/activity/types';
import { times } from 'lodash';
import styles from './ActivityList.module.scss';

type ActivityListProps = {
    filter: ActivityType[]
}

export function ActivityList({ filter }: ActivityListProps) {
    const userActivity = useActivityStore(state => state.userActivity);
    const { address } = useAccount();
    const { isLoading } = useActivity({
        userAddress: address,
        types: filter
    });

    // TODO: Error
    if (isLoading || !userActivity) {
        return (
            <div className={styles.wrapper}>
                {times(6).map(index => <ActivityCardSkeleton key={index} />)}
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'grid',
                gap: '12px',
                gridTemplateColumns: '1fr'
            }}
        >
            {userActivity.map((activity) => <ActivityCard
                activity={activity}
                key={activity.id}
            />)}
        </div>
    );
}