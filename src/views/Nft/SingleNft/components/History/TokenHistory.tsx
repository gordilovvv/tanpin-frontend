import { memo } from 'react';
import { BlockWrap } from '../BlockWrap/BlockWrap';
import { AuctionBets } from './Bets/AuctionBets';
import { TransactionsHistory } from './Transactions/TransactionsHistory';
import { useNFTStore } from '@/states/nft/store';
import { NFTSaleStatus } from '@/states/types';

export const TokenHistory = memo(() => {
    const [tokenID, status] = useNFTStore(state => [
        state.nft!.ID,
        state.nft!.status
    ]);

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