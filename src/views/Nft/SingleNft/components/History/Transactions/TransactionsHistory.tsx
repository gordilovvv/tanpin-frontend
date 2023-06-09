
import { HistoryTransaction, TransactionRowSkeleton } from '@/components/Transaction';
import times from 'lodash/times';
import styles from './TransactionsHistory.module.scss';
import { useActivity } from '@/states/activity/hooks/useActivity';
import { TransactionType } from '@/states/types';
import { useActivityStore } from '@/states/activity/store';

const SKELETONS_COUNT = 5;

type TransactionsHistoryProps = {
    tokenID?: string

}

export function TransactionsHistory({ tokenID }: TransactionsHistoryProps) {
    const { isLoading } = useActivity(
        {
            tokenID,
            types: [TransactionType.BUY, TransactionType.LISTED, TransactionType.MINT, TransactionType.TRANSFER, TransactionType.UNLISTED]
        }
    );

    const tokenActivity = useActivityStore(state => state.tokenActivity);

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
                key={tx.transactionHash}
                transaction={tx}
            />)}
        </div>
    );

}