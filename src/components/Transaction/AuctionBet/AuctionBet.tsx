import { memo } from 'react';
import { TransactionRow } from '../TransactionRow/TransactionRow';
import { Account } from '../Common/Account';
import { Amount } from '../Common/Amount';
import { useTranslation } from '@/localization';
import type { AuctionBet as AuctionBetType } from '@/states/types';

type AuctionBetProps = {
    bet: AuctionBetType
}

export const AuctionBet = memo(({ bet }: AuctionBetProps) => {
    const { t } = useTranslation();

    return (
        <TransactionRow
            date={bet.createdAt}
            userAddress={bet.owner}
            transactionHash={bet.transactionHash}
        >
            {/* eslint-disable-next-line react/jsx-newline */}
            <Account address={bet.owner} /> {t('bid')} <Amount
                amount={bet.bet.amount}
                currency={bet.bet.currency}
            />
        </TransactionRow>
    );
});

AuctionBet.displayName = 'AuctionBet';