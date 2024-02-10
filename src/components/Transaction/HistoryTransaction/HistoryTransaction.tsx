import { ReactNode, memo } from 'react';
import { TransactionRow } from '../TransactionRow/TransactionRow';
import { Account } from '../Common/Account';
import { Editions } from '../Common/Editions';
import { Amount } from '../Common/Amount';
import { ActivityTransaction, ActivityType } from '@/states/activity/types';
import { useTranslation } from '@/localization';

type HistoryTransactionProps = {
    transaction: ActivityTransaction
}

export const HistoryTransaction = memo(({ transaction }: HistoryTransactionProps) => {
    const { t } = useTranslation();
    let description: ReactNode;

    /* eslint-disable react/jsx-max-props-per-line */
    if (transaction.type === ActivityType.MINT) {
        description = (<div><Account address={transaction.owner} /> {t('minted')}</div>);
    }

    if (transaction.type === ActivityType.BUY && transaction.price && transaction.amount) {
        description = (
            <div><Account address={transaction.owner} /> {t('bought')} <Editions num={transaction.amount} isPurchase /> {t('for')} <Amount
                amount={transaction.price.amount}
                currency={transaction.price.currency}
            /></div>
        );
    }

    if (transaction.type === ActivityType.LISTED && transaction.price && transaction.amount) {
        description = (
            <div><Account address={transaction.owner} /> {t('listed')} <Editions num={transaction.amount} isPurchase /> {t('for')} <Amount
                amount={transaction.price.amount}
                currency={transaction.price.currency}
            /></div>
        );
    }

    if (transaction.type == ActivityType.UNLISTED && transaction.amount) {
        description = (<div><Account address={transaction.owner} /> {t('unlisted')} <Editions num={transaction.amount} isPurchase /></div>);
    }

    if (transaction.type === ActivityType.TRANSFER && transaction.amount && transaction.transferedTo) {
        description = (<div><Account address={transaction.owner} /> {t('transfered')} <Editions num={transaction.amount} isPurchase /> {t('to')} <Account address={transaction.transferedTo} /></div>);
    }

    if (!description) {
        description = (<div><span>{t('Unknown transaction:')} {transaction.type}</span></div>);
    }
    /* eslint-enable react/jsx-max-props-per-line */

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