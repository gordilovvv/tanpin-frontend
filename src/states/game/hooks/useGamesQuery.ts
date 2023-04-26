import useSWR from 'swr';
import { GamesQueryBody } from '../types';
import { fetchGames } from '../fetch/fetchGames';

export function useGamesQuery(body: GamesQueryBody) {
    const { data: games, isLoading, error } = useSWR(
        '/games/list',
        () => fetchGames(body)
    );
    return {
        games,
        isLoading,
        error
    };
}
