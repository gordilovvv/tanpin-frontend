import useSWR from 'swr';
import { fetchHistory } from '../fetch/fetchHistory';

export function useHistoryQuery(id: string) {
    const { data: history, isLoading, error } = useSWR(
        ['get.history', id],
        () => fetchHistory(id)
    );
    
    return {
        history,
        isLoading,
        error
    };
}
