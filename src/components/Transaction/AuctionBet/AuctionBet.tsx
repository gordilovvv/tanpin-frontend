import { memo } from 'react';
import { UnstyleLink } from '@/uikit';
import { TransitionRow } from '../TransitionRow/TransitionRow';
import { ellipseAddress } from '@/utils/addressHelper';
import { getAddressExplorerURL } from '@/utils/explorer';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import type { AuctionBet as AuctionBetType } from '@/states/types';
import styles from './AuctionBet.module.scss';

type AuctionBetProps = {
    bet: AuctionBetType
}

export const AuctionBet = memo(({ bet }: AuctionBetProps) => {
    return (
        <TransitionRow
            date={bet.createdAt}
            userAddress={bet.owner}
            transactionHash={bet.transactionHash}
        >
            <UnstyleLink
                rel='noreferrer noopener'
                target='_blank'
                href={getAddressExplorerURL(bet.owner)}
                className={styles.link}
            // eslint-disable-next-line react/jsx-newline
            >{ellipseAddress(bet.owner)}</UnstyleLink> bid <span className={styles.amount}>{formatTokenAmount(bet.bet.amount)} {bet.bet.currency}</span>
        </TransitionRow>
    );
});

AuctionBet.displayName = 'AuctionBet';