import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import type { GameQueryResponse } from '../types';

export async function fetchGame(id: string): Promise<GameQueryResponse> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 300));

        // @ts-ignore
        return {
            ID: '0',
            name: 'NFTGTA',
            description: 'The world\'s first blockchain-based GTA RP project. Create your own world with your favorite content creators, play and earn NFTs, exchange resources and other stuff with players and earn on selling it on Tanpin.',
            imageURL:
                'https://c4.wallpaperflare.com/wallpaper/514/241/320/gta-5-online-wallpaper-preview.jpg',
            coverURL: '/images/game-cover.png',
            logoURL:
                'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nft-logo-design-template-9a41fca75305c8d9d529826cee16e8b9_screen.jpg?ts=1290',
            stats: {
                volume: {
                    currency: 'USDT',
                    amount: '1290',
                },
                items: 256,
                collections: 3,
                floor: {
                    amount: '34234',
                    currency: 'USDT',
                },
            },
        };
    }

    const { data } = await api.get<GameQueryResponse>(`/game.get/${id}`);

    return data;
}
