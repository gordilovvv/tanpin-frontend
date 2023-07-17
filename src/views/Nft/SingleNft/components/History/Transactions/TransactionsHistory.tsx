
import { HistoryTransaction, TransactionRowSkeleton } from '@/components/Transaction';
import { useNFTStore } from '@/states/nft/store';
import { useActivityStore } from '@/states/activity/store';
import times from 'lodash/times';
import styles from './TransactionsHistory.module.scss';

const SKELETONS_COUNT = 5;

export function TransactionsHistory() {
    const tokenActivity = useActivityStore(state => state.activityList);
    const isLoading = useNFTStore(state => state.isLoadingActivity);

    if (isLoading || !tokenActivity) {
        return (
            <div className={styles.wrapper}>
                {times(SKELETONS_COUNT).map(
                    (idx) => <TransactionRowSkeleton key={idx} />)
                }
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            {tokenActivity.map(tx => <HistoryTransaction
                key={tx.ID}
                transaction={tx}
            />)}
        </div>
    );
}