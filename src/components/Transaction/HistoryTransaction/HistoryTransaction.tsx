
import { memo } from 'react';
import { TransactionRow } from '../TransactionRow/TransactionRow';
import { Account } from '../Common/Account';
import { Amount } from '../Common/Amount';
import { ActivityTransaction, ActivityType } from '@/states/activity/types';
import { Editions } from '../Common/Editions';
import styles from './HistoryTransaction.module.scss';

type HistoryTransactionProps = {
    transaction: ActivityTransaction
}

export const HistoryTransaction = memo(({ transaction }: HistoryTransactionProps) => {
    // TODO: ДОБАВИТЬ АУКЦИОН
    const renderContent = () => {
        switch (transaction.type) {

            case ActivityType.MINT:
                return (<div><Account address={transaction.owner} /> minted</div>);

            case ActivityType.BUY:
                return (
                    // eslint-disable-next-line react/jsx-newline
                    <div><Account address={transaction.owner} /> bought <Editions num={transaction.amount!} /> for <Amount
                        amount={transaction.price!.amount}
                        currency={transaction.price!.currency}
                    /></div>
                );

            case ActivityType.LISTED:
                return (<div><Account address={transaction.owner} /> listed <Editions num={transaction.amount!} /> for <Amount
                    amount={transaction.price!.amount}
                    currency={transaction.price!.currency}
                /></div>);

            case ActivityType.UNLISTED:
                return (<div><Account address={transaction.owner} /> unlisted <Editions num={transaction.amount!} /></div>);

            case ActivityType.TRANSFER:
                return (<div><Account address={transaction.owner} /> transfered <Editions num={transaction.amount!} /> to <Account address={transaction.transferedTo!} /></div>);

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