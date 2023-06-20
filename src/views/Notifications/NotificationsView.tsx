import { Container, PageWrapper } from '@/components/Layout';
import { ActivityCard } from '@/components/Activity';
import styles from './NotificationsView.module.scss';

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

export function NotificationsView() {
    return (
        <PageWrapper>
            <Container>
                {data.map((el) => <ActivityCard
                    activity={el}
                    key={el.transactionHash}
                />)}
            </Container>
        </PageWrapper>
    );
}