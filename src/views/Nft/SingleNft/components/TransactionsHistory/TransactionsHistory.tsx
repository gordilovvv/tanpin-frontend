import { useHistoryQuery } from '@/states/nft/hooks/useHistoryQuery';
import { HistoryTransaction } from '@/components/Transaction';
import { TransitionRowSkeleton } from '@/components/Transaction';
import times from 'lodash/times';
import styles from './TransactionsHistory.module.scss';

type TransactionsHistoryProps = {
    id: string
}

export function TransactionsHistory({ id }: TransactionsHistoryProps) {
    const { history, isLoading } = useHistoryQuery(id);

    return (<>
        {isLoading || !history
            ? <div
                className={styles.wrapper}
            >
                {
                    times(4).map((idx) => <TransitionRowSkeleton
                        key={idx}
                        widthType={idx}
                    />)
                }
            </div>
            : <div
                className={styles.wrapper}
            >
                {
                    history.map((transaction) => {
                        return (
                            <HistoryTransaction
                                transaction={transaction}
                                key={transaction.transactionHash}
                            />
                        );
                    })
                }
            </div>}

    </>
    );
}