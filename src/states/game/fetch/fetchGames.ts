import axios from 'axios';
import type { GamesQueryBody, GamesQueryResponse } from '../types';

export async function fetchGames(body: GamesQueryBody): Promise<GamesQueryResponse[]> {
    const { data } = await axios.post<GamesQueryResponse[]>('/game.get.list', body);
    return data;
}

