import useSWR from 'swr';
import { fetchGame } from '../fetch/fetchGame';

export function useGameQuery(id: string) {
    const { data: game, isLoading, error } = useSWR(
        ['games.get', id],
        () => fetchGame(id)
    );

    return {
        game,
        isLoading,
        error
    };
}
