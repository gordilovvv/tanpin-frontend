import { create } from 'zustand';
import { NFT } from '../types';

type State = {
    nft: NFT | undefined
    isLoadingActivity: boolean
}

type Actions = {
    setNFT: (nft: State['nft']) => void
    setIsLoadingActivity: (loading: boolean) => void
}

export const useNFTStore = create<State & Actions>()(
    (set) => ({
        nft: undefined,
        isLoadingActivity: false,

        setNFT: (nft) => {
            set({ nft });
        },
        setIsLoadingActivity: (loading) => {
            set({ isLoadingActivity: loading });
        }
    })
);