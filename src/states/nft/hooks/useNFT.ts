import { useNFTStore } from '../store';

export function useNFT() {
    const nft = useNFTStore(state => state.nft);

    return nft;
}