import { Container, PageWrapper } from '@/components/Layout';
import styles from './ActivityView.module.scss';
import { Select, Title } from '@/uikit';
import { ActivityFilter } from '@/components/Filter';
import { ActivityList } from './components/ActivityList/ActivityList';

const options = [{ value: 'someValue', label: 'someLabel' },];

export function ActivityView() {
    return (
        <PageWrapper>
            <Container className={styles.container}>
                <Title className={styles.title}>Notifications</Title>

                <div className={styles.wrapper}>
                    <ActivityList />
                    {/* <Select
                        options={[{ value: 'lol', label: 'd' }]}
                        onChange={() => null}
                    /> */}

                    <ActivityFilter options={options} />

                </div>
            </Container>
        </PageWrapper>
    );
}