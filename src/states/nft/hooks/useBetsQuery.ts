import useSWR from 'swr';
import { fetchBets } from '../fetch/fetchBets';

export function useBetsQuery(id: string) {
    const { data: bets, isLoading, error } = useSWR(
        ['get.bets', id],
        () => fetchBets(id)
    );
    
    return {
        bets,
        isLoading,
        error
    };
}
