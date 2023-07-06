import { Title } from '@/uikit';
import { Container, PageWrapper } from '@/components/Layout';
import { ActivityList } from './components/List/ActivityList';
import { ActivityFilter } from './components/Filter/ActivityFilter';
import styles from './ActivityView.module.scss';

export function ActivityView() {
    return (
        <PageWrapper>
            <Container
                maxWidth={993}
                className={styles.container}
                space
            >
                <Title className={styles.title}>Notifications</Title>

                <div className={styles.wrapper}>
                    <ActivityList />
                    <ActivityFilter />
                </div>
            </Container>
        </PageWrapper>
    );
}