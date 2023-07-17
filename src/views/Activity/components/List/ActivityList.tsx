import { ActivityCard, ActivityCardSkeleton } from '@/components/Activity';
import { EmptyResult } from '@/components/Explorer';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useActivity } from '@/states/activity/hooks/useActivity';
import { useActivityStore } from '@/states/activity/store';
import { times } from 'lodash';
import styles from './ActivityList.module.scss';

export function ActivityList() {
    const { address } = useAccount();

    const [filter] = useActivityStore(state => [
        state.userActivity,
        state.userActivityFilter
    ]);

    const activity = [
        {
            ID: '2',
            type: 'minted',
            owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
            price: {
                amount: '100',
                currency: 'USDT',
            },
            date: '2023-05-29',
            transactionHash: '0x0987654321fedcba4',
        },
        {
            ID: '4',
            type: 'transfer',
            owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
            date: '2023-05-29',
            transactionHash: '0x0987654321fedcba4',
        },
        {
            ID: '5',
            type: 'mint',
            price: {
                amount: '100',
                currency: 'USDT',
            },
            owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
            date: '2023-05-29',
            transactionHash: '0x0987654321fedcba4',
        },
        {
            ID: '6',
            type: 'mint',
            price: {
                amount: '100',
                currency: 'USDT',
            },
            owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
            date: '2023-05-29',
            transactionHash: '0x0987654321fedcba4',
        },
    ];

    const { isLoading } = useActivity({
        userAddress: address,
        types: filter
    });

    // TODO: Error
    if (isLoading || !activity) {
        return (
            <div className={styles.wrap}>
                {times(6).map(index => <ActivityCardSkeleton key={index} />)}
            </div>
        );
    }

    if (!activity.length) {
        return (<EmptyResult
            title='Nothing found'
            text="We couldn't find anything with this criteria"
        />);
    }

    return (
        <div className={styles.wrap}>
            {activity.map((activity) => <ActivityCard
                key={activity.ID}
                activity={activity}
            />)}
        </div>
    );
}