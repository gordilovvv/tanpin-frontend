import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import type { Game } from '../types';

export async function fetchGame(id: string): Promise<Game> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 300));

        return {
            ID: '0',
            name: 'NFTGTA',
            logoURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nft-logo-design-template-9a41fca75305c8d9d529826cee16e8b9_screen.jpg?ts=1290'
        };
    }

    const { data } = await api.get<Game>(`/games/${id}`);

    return data;
}
