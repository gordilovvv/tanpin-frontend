
import { HistoryTransaction, TransactionRowSkeleton } from '@/components/Transaction';
import { useNFTHistory } from '@/states/nft/hooks/useNFTHistory';
import times from 'lodash/times';
import styles from './TransactionsHistory.module.scss';

const SKELETONS_COUNT = 5;

type TransactionsHistoryProps = {
    tokenID: string
}

export function TransactionsHistory({ tokenID }: TransactionsHistoryProps) {
    const { history, isLoading } = useNFTHistory(tokenID);

    if (isLoading || !history) {
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
            {history.map(tx => <HistoryTransaction
                key={tx.transactionHash}
                transaction={tx}
            />)}
        </div>
    );

}