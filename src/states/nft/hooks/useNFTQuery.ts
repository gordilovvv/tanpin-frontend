import useSWRImmutable from 'swr/immutable';
import { fetchNFT } from '../fetch/fetchNFT';
import { NFTListFilter } from '../types';

export function useNFTQuery(body: NFTListFilter) {
    const { data: nftList, isLoading, error } = useSWRImmutable(
        ['get.list', body],
        () => fetchNFT(body)
    );

    return {
        nftList,
        isLoading,
        error
    };
}
