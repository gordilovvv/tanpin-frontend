import { ActivityCard } from '@/components/Activity';
import { useActivity } from '@/states/activity/hooks/useActivity';
import { useActivityStore } from '@/states/activity/store';
import { TransactionType } from '@/states/types';
import styles from './ActivityList.module.scss';

type ActivityListProps = {
    filter: { value: string, label: string }[] | []
}


export function ActivityList({ filter }: ActivityListProps) {

    const { isLoading } = useActivity({
        userAddress: '333',
        types: [TransactionType.BUY, TransactionType.LISTED, TransactionType.MINT, TransactionType.TRANSFER, TransactionType.UNLISTED]
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
        <div>
            {userActivity.map((activity) => <ActivityCard
                activity={activity}
                key={activity.transactionHash}
            />)}
        </div>
    );
}