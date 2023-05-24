import useSWRImmutable from 'swr/immutable';
import { NFTQueryBody } from '../types';
import { fetchNFT } from '../fetch/fetchNFT';

export function useNFTQuery(body: NFTQueryBody) {
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
