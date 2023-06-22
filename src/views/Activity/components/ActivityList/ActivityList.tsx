import { ActivityCard } from '@/components/Activity';
// import styles from './ActivityList.module.scss';

type ActivityListProps = {
    filter: { value: string, option: string }[]
}

const data = [
    {
        id: '234234',
        type: 'transfer',
        owner: 'address1',
        transferedTo: 'fsdf32f34rf23f',
        amount: 10,
        price: {
            amount: '8',
            currency: 'USDT'
        },
        date: new Date().toString(),
        transactionHash: 'fsdf32f3fsdf4rf23f'
    },
    {
        id: '234234',
        type: 'transfer',
        owner: 'address1',
        transferedTo: 'fsdf32fd34rf23f',
        amount: 10,
        price: {
            amount: '8',
            currency: 'USDT'
        },
        date: new Date().toString(),
        transactionHash: 'fsdf32f3fsdf4rf23f'
    },
    {
        id: '32424',
        type: 'transfer',
        owner: 'address1',
        transferedTo: 'fsdf32fd34rf23f',
        amount: 10,
        price: {
            amount: '8',
            currency: 'USDT'
        },
        date: new Date().toString(),
        transactionHash: 'fsdf32ff3fsdf4rf23f'
    },
];

export function ActivityList({ filter }: ActivityListProps) {
    return (
        <div>
            {data.map((activity) => <ActivityCard
                activity={activity}
                key={activity.transactionHash}
            />)}
        </div>
    );
}