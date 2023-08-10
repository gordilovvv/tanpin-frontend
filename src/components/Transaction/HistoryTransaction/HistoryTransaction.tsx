
import { ReactNode, memo } from 'react';
import { TransactionRow } from '../TransactionRow/TransactionRow';
import { Account } from '../Common/Account';
import { Editions } from '../Common/Editions';
import { Amount } from '../Common/Amount';
import { ActivityTransaction, ActivityType } from '@/states/activity/types';

type HistoryTransactionProps = {
    transaction: ActivityTransaction
}

export const HistoryTransaction = memo(({ transaction }: HistoryTransactionProps) => {

    let description: ReactNode;

    if (transaction.type === ActivityType.MINT) {
        description = (<div><Account address={transaction.owner} /> minted</div>);
    }

    if (transaction.type === ActivityType.BUY && transaction.price && transaction.amount) {
        description = (
            <div><Account address={transaction.owner} /> bought <Editions num={transaction.amount} /> for <Amount
                amount={transaction.price.amount}
                currency={transaction.price.currency}
            /></div>
        );
    }

    if (transaction.type === ActivityType.LISTED && transaction.price && transaction.amount) {
        description = (
            <div><Account address={transaction.owner} /> listed <Editions num={transaction.amount} /> for <Amount
                amount={transaction.price.amount}
                currency={transaction.price.currency}
            /></div>
        );
    }

    if (transaction.type == ActivityType.UNLISTED && transaction.amount) {
        description = (<div><Account address={transaction.owner} /> unlisted <Editions num={transaction.amount} /></div>);
    }

    if (transaction.type === ActivityType.TRANSFER && transaction.amount && transaction.transferedTo) {
        description = (<div><Account address={transaction.owner} /> transfered <Editions num={transaction.amount} /> to <Account address={transaction.transferedTo} /></div>);
    }

    if (!description) {
        description = (<div><span>Unknown transaction: {transaction.type}</span></div>);
    }

    return (
        <TransactionRow
            date={transaction.date}
            userAddress={transaction.owner}
            transactionHash={transaction.transactionHash}
        >
            {description}
        </TransactionRow>
    );
});

HistoryTransaction.displayName = 'HistoryTransaction';