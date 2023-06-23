import { Container, PageWrapper } from '@/components/Layout';
import styles from './ActivityView.module.scss';
import { Select, Title } from '@/uikit';
import { ActivityFilter } from '@/components/Filter';
import { ActivityList } from './components/ActivityList/ActivityList';
import { useActivityStore } from '@/states/activity/store';

const options = [{ value: 'someValue', label: 'someLabel' },];

export function ActivityView() {
    const filterActivity = useActivityStore(state => state.filterActivity);
    return (
        <PageWrapper>
            <Container className={styles.container}>
                <Title className={styles.title}>Notifications</Title>

                <div className={styles.wrapper}>
                    <ActivityList filter={filterActivity} />
                    <ActivityFilter options={options} />
                </div>
            </Container>
        </PageWrapper>
    );
}