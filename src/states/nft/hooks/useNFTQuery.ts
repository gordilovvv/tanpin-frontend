import useSWR from 'swr';
import { fetchNFT } from '../fetch/fetchNFT'; 

export function useNFTQuery(id: string) {
    const { data: nft, isLoading, error } = useSWR(
        ['nft.get', id],
        () => fetchNFT(id)
    );
    
    return {
        nft,
        isLoading,
        error
    };
}
