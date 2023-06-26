import { create } from 'zustand';
import { NFTInStore } from './types';
import { Auction, AuctionBet } from '../types';
import { ActivityTransaction } from '../activity/types';

type State = {
    nft: NFTInStore | undefined
    auction: Auction | undefined
    historyTxs: ActivityTransaction[] | undefined
    actionTransaction?: {
        hash: string,
        status: 'PENDING' | 'CONFIRMED' | 'REJECTED' // TODO: transaction error
    }
    actionError?: string
}

type Actions = {
    setNFT: (nft: State['nft']) => void
    setAuction: (auction: State['auction']) => void
    setAuctionBets: (bets: AuctionBet[]) => void
    setHistoryTxs: (txs: ActivityTransaction[]) => void
}

export const useNFTStore = create<State & Actions>()(
    (set, get) => ({
        nft: undefined,
        auction: undefined,
        historyTxs: undefined,

        setNFT: (nft) => {
            set({ nft });
        },

        setAuction: (auction) => {
            set({ auction });
        },

        setAuctionBets: (bets) => {
            const auction = get().auction;

            if (auction) {
                set(state => {
                    return {
                        auction: {
                            ...state.auction!,
                            betList: bets
                        }
                    };
                });
            }
        },

        setHistoryTxs: (txs) => {
            set({ historyTxs: txs });
        }
    })
);