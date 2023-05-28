import { memo } from 'react';
import type { AuctionBet as AuctionBetType } from '@/states/types';
import { TransitionRow } from '../TransitionRow/TransitionRow';
import { UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { getAddressExplorerURL } from '@/utils/explorer';
import classNames from 'classnames';
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
                className={classNames(styles.link, styles.white)}
            >{ellipseAddress(bet.owner)}</UnstyleLink> bid <span className={styles.white}> {bet.bet.amount} {bet.bet.currency}</span >
        </TransitionRow>
    );
});

AuctionBet.displayName = 'AuctionBet';