import { Container, PageWrapper } from '@/components/Layout';
import styles from './ActivityView.module.scss';
import { Select, Title } from '@/uikit';
import { ActivityFilter } from '@/components/Filter';
import { ActivityList } from './components/ActivityList/ActivityList';
import { useActivityStore } from '@/states/activity/store';

const options = [
    { value: 'sales', label: 'Sales' },
    { value: 'listings', label: 'Listings' },
    { value: 'bids', label: 'Bids' },
    { value: 'transfers', label: 'Transfers' },
    { value: 'purchases', label: 'Purchases' },
    { value: 'mints', label: 'Mints' },
];

export function ActivityView() {
    const filterActivity = useActivityStore(state => state.userActivityFilter);

    return (
        <PageWrapper>
            <Container
                maxWidth={963}
                className={styles.container}
                space
            >
                <Title className={styles.title}>Notifications</Title>

                <div className={styles.wrapper}>
                    <ActivityList filter={filterActivity} />
                    <ActivityFilter options={options} />
                </div>
            </Container>
        </PageWrapper>
    );
}