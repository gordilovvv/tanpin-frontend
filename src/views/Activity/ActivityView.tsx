import { Title } from '@/uikit';
import { Container, PageWrapper } from '@/components/Layout';
import { ActivityList } from './components/List/ActivityList';
import { ActivityFilter } from './components/Filter/ActivityFilter';
import { useTranslation } from '@/localization';
import styles from './ActivityView.module.scss';

export function ActivityView() {
    const { t } = useTranslation();

    return (
        <PageWrapper>
            <Container
                maxWidth={993}
                className={styles.container}
                space
            >
                <Title className={styles.title}>{t('Notifications')}</Title>

                <div className={styles.wrapper}>
                    <ActivityList />
                    <ActivityFilter className={styles.filter} />
                </div>
            </Container>
        </PageWrapper>
    );
}