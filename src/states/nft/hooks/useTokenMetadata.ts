import { useNFTStore } from '../store';

// TODO: ПЕРЕИМНОВАТЬ
export function useTokenMetadata() {
    const [ID, name, collection, attributes] = useNFTStore(state => [
        state.nft?.ID,
        state.nft?.name,
        state.nft?.collection,
        state.nft?.attributes
    ]);

    if (!ID || !name || !collection || !attributes) {
        return;
    }

    return { ID, name, collection, attributes };
}