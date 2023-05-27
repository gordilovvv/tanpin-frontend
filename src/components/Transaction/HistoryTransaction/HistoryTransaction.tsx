import type { HistoryTransaction } from '@/states/types';
import { TransitionRow } from '../TransitionRow/TransitionRow';
import styles from './HistoryTransaction.module.scss';


type HistoryTransactionProps = {
    transactions: HistoryTransaction[]
}

export function HistoryTransaction({ transactions }: HistoryTransactionProps) {
    return (
        <div
            className={styles.wrapper}
        >
            {
                transactions.map((transaction, idx) => {
                    return (
                        <TransitionRow
                            transaction={transaction}
                            key={idx}
                        />
                    );
                })
            }
        </div>
    );
}