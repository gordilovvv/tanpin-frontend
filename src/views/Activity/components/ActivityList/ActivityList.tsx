import { ActivityCard } from '@/components/Activity';
import { useActivity } from '@/states/activity/hooks/useActivity';
import { useActivityStore } from '@/states/activity/store';
import styles from './ActivityList.module.scss';
import { ActivityType } from '@/states/activity/types';

type ActivityListProps = {
    filter: string[]
}

export function ActivityList({ filter }: ActivityListProps) {

    //T0D0 добавить сортировку на фронте

    const { isLoading } = useActivity({
        userAddress: '333',
        types: [ActivityType.BUY, ActivityType.LISTED, ActivityType.MINT, ActivityType.TRANSFER, ActivityType.UNLISTED]
    });


    const userActivity = useActivityStore(state => state.userActivity);

    if (isLoading || !userActivity) {
        return (
            <div className={styles.wrapper}>
                {/* {times(SKELETONS_COUNT).map(
                    (idx) => <TransactionRowSkeleton key={idx} />)
                } */}
                loading
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