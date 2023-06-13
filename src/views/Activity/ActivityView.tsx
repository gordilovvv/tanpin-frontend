import { Container, PageWrapper } from '@/components/Layout';
import { useActivity } from '@/states/activity/hooks/useActivity';
import { useActivityStore } from '@/states/activity/store';
import styles from './ActivityView.module.scss';
import { TransactionType } from '@/states/types';
import { ActivityRow } from './components/ActivityRow/ActivityRow';
import { Spin } from '@/uikit';

export function ActivityView() {
    const { isLoading, error } = useActivity({
        tokenID: '3',
        types: [TransactionType.BUY, TransactionType.LISTED, TransactionType.MINT, TransactionType.TRANSFER, TransactionType.UNLISTED]
    });

    const tokenActivity = useActivityStore(state => state.tokenActivity);

    if (isLoading) {
        return (
            <div className={styles.wrapper}>
                <Spin size='m' />
            </div>
        );
    }
    if (error) {
        return (
            <div className={styles.wrapper}>
                error
            </div>
        );
    }

    return (
        <PageWrapper>
            <Container>
                <div>
                    Activity
                </div>

                <div className={styles.inner}>
                    {
                        tokenActivity!.map((tx) => <ActivityRow
                            tx={tx}
                            key={tx.transactionHash}
                        />)
                    }
                </div>

            </Container>
        </PageWrapper>
    );
}