import { memo } from 'react';
import { TransactionRow } from '../TransactionRow/TransactionRow';
import { DetailsMultiplyNFT, DetailsSingleNFT } from '../Common/Details';
import { ActivityTransaction } from '@/states/activity/types';

type HistoryTransactionProps = {
    transaction: ActivityTransaction
    uniqueToken: boolean
}

export const HistoryTransaction = memo(({ transaction, uniqueToken }: HistoryTransactionProps) => {
    return (
        <TransactionRow transaction={transaction}>
            {uniqueToken
                ? <DetailsSingleNFT transaction={transaction} />
                : <DetailsMultiplyNFT transaction={transaction} />}
        </TransactionRow>
    );
});

HistoryTransaction.displayName = 'HistoryTransaction';