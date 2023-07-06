import { MOCK_API_CALLS } from '@/config';
import { Collection } from '../types';
import { api } from '@/app/api';

/**
 * Function fetches popular collections for Search suggestions
 */
export async function fetchPopularCollections() {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 300));

        return [
            {
                ID: '1',
                name: 'Test Collection',
                description: 'World',
                logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1hb2FmeWpCeTk3TktFUFp6QUQzRks4UmN3Q0pIYjI2M2RESmJoQ2FYUFdwbw==',
                coverURL: '',
                symbol: 'HW',
                stats: {
                    items: 100,
                    sales: 900,
                    volume: {
                        amount: '1000.1240214',
                        currency: 'USDT'
                    },
                    floor: {
                        amount: '10',
                        currency: 'USDT'
                    }
                },
                attributes: [],
                game: {
                    ID: '1',
                    name: 'GTA'
                }
            },
            {
                ID: '2',
                name: 'Test Collection 2',
                description: 'World',
                logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pLnNlYWRuLmlvL2djcy9maWxlcy9jNmNiMGIxZDZmMmFiNjFjMGVmYWNmMDBlNjJlMjIzMC5qcGc/dz01MDAmYXV0bz1mb3JtYXQ=',
                coverURL: '',
                symbol: 'HW',
                stats: {
                    items: 100,
                    sales: 900,
                    volume: {
                        amount: '1000.1240214',
                        currency: 'USDT'
                    },
                    floor: {
                        amount: '10',
                        currency: 'USDT'
                    }
                },
                attributes: [],
                game: {
                    ID: '1',
                    name: 'GTA'
                }
            },
        ] as Collection[];
    }

    const { data } = await api.get<Collection[]>('/search/collections.popular');

    return data;
}