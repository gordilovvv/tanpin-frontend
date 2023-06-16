
import { memo } from 'react';
import { TransactionRow } from '../TransactionRow/TransactionRow';
import { Account } from '../Common/Account';
import { Amount } from '../Common/Amount';
import { HistoryTransaction as HistoryTransactionData, TransactionType } from '@/states/types';
import styles from './HistoryTransaction.module.scss';

type HistoryTransactionProps = {
    transaction: HistoryTransactionData
}

export const HistoryTransaction = memo(({ transaction }: HistoryTransactionProps) => {
    const renderContent = () => {
        switch (transaction.type) {

            case TransactionType.MINT:
                return (<div><Account address={transaction.owner} /> minted</div>);

            case TransactionType.BUY:
                return (
                    // eslint-disable-next-line react/jsx-newline
                    <div><Account address={transaction.owner} /> bought for <Amount
                        amount={transaction.price!.amount}
                        currency={transaction.price!.currency}
                    /></div>
                );

            case TransactionType.LISTED:
                return (<div><Account address={transaction.owner} /> listed</div>);

            case TransactionType.UNLISTED:
                return (<div><Account address={transaction.owner} /> unlisted</div>);

            case TransactionType.TRANSFER:
                return (<div><Account address={transaction.owner} /> transfered to <Account address={transaction.transferedTo!} /></div>);

            default:
                return (<div className={styles.white}>Unknown transaction: {transaction.type}</div>);

        }
    };


    return (
        <TransactionRow
            date={transaction.date}
            userAddress={transaction.owner}
            transactionHash={transaction.transactionHash}
        >
            {renderContent()}
        </TransactionRow>
    );

});

HistoryTransaction.displayName = 'HistoryTransaction';