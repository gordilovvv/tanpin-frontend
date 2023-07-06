import useSWRImmutable from 'swr/immutable';
import { fetchBestOffer } from '../fetch/fetchBestOffer';

export function useBestOffer(nftID: string) {
    const { data: bestOffer, isLoading } = useSWRImmutable(
        [nftID],
        () => fetchBestOffer(nftID)
    );

    return {
        bestOffer,
        isLoading
    };
}