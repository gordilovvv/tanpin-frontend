import useSWRImmutable from 'swr/immutable';
import { NFTQueryBody } from '../types';
import { nftQuery } from '../fetch/nftQuery';

export function useNFTQuery(body: NFTQueryBody) {
    const { data: nftList, isLoading, error } = useSWRImmutable(
        ['get.list', body],
        () => nftQuery(body)
    );

    return {
        nftList,
        isLoading,
        error
    };
}