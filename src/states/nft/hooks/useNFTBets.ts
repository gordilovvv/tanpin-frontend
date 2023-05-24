import useSWR from 'swr';
import { fetchNFTBets } from '../fetch/fetchNFTBets';

export function useNFTBets(id: string) {
    const { data: bets, isLoading, error }
        = useSWR(
            ['bets', id],
            () => fetchNFTBets(id)
        );
    return {
        bets, isLoading, error
    };
}
