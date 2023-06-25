import { memo } from 'react';
import { BlockWrap } from '../BlockWrap/BlockWrap';
import { AuctionBets } from './Bets/AuctionBets';
import { TransactionsHistory } from './Transactions/TransactionsHistory';
import { useNFTStore } from '@/states/nft/store';
import { NFTSaleStatus } from '@/states/types';

import { useActivity } from '@/states/activity/hooks/useActivity';

export const TokenHistory = memo(() => {
    const [tokenID, status] = useNFTStore(state => [
        state.nft!.ID,
        state.nft!.status
    ]);

    const { activity } = useActivity({ userAddress: '3', tokenID: '3', types: [] });
    console.log(activity);

    return (
        <>
            {status === NFTSaleStatus.AUCTION && <BlockWrap title="Bids">
                <AuctionBets tokenID={tokenID} />
            </BlockWrap>}

            <BlockWrap title="Transactions">
                <TransactionsHistory tokenID={tokenID} />
            </BlockWrap>
        </>
    );
});

TokenHistory.displayName = 'TokenHistory';