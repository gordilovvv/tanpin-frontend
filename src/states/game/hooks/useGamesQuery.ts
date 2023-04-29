import useSWR from 'swr';
import { fetchGames } from '../fetch/fetchGames';
import { GamesQueryBody } from '../types';

export function useGamesQuery(body: GamesQueryBody) {
    const { data: games, isLoading } = useSWR(
        ['games.get', body],
        () => fetchGames(body)
    );
    return {
        games,
        isLoading
    };
}
