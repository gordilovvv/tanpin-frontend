import { useRef } from 'react';
import useSWR from 'swr';
import { useNFTStore } from '../store';
import { fetchAuctionBets } from '../fetch/fetchAuctionBets';
import { AUCTION_BIDS_REFRESH_INTERVAL } from '@/config/constants/nft';
import { AuctionBet } from '@/states/types';

export function useAuctionBets(tokenID: string) {
    const [auction, setAuctionBets] = useNFTStore(state => [state.auction, state.setAuctionBets]);
    const firstTimeLoaded = useRef<boolean>(false);

    const { data: bets, isLoading } = useSWR<AuctionBet[] | undefined>(
        ['auction.get.bets', tokenID],
        async () => {
            firstTimeLoaded.current = true;

            if (!firstTimeLoaded && auction) {
                return auction.betList;
            }

            const bets = await fetchAuctionBets(tokenID);

            setAuctionBets(bets);

            return bets;
        },
        {
            dedupingInterval: AUCTION_BIDS_REFRESH_INTERVAL,
            refreshInterval: AUCTION_BIDS_REFRESH_INTERVAL
        }
    );

    return {
        bets,
        isLoading
    };
}
