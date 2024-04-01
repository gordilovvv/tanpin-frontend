import useSWRImmutable from 'swr/immutable';
import { fetchGame } from '../fetch/fetchGame';

export function useGameFetcher(id: string) {
    const { data: game, isLoading, error } = useSWRImmutable(
        ['games.get', id],
        () => fetchGame(id),
        { revalidateOnFocus: true }
    );

    return {
        game,
        isLoading,
        error
    };
}
