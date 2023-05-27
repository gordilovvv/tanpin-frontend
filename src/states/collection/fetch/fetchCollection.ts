import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { Collection } from '../types';

export async function fetchCollection(collectionID: string): Promise<Collection> {
    if (MOCK_API_CALLS) {
        return {
            ID: '1',
            name: 'YAYO NFT',
            description: 'YAYO NFT is a collection of 4000 YAYO Men embodying the furthest archetypes of power, speed, violence, wealth, chaos, and adventure. YAYO is a tribute to the vehicles, equipment, and aesthetics that have captured the hearts and minds of young men for generations.',
            logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pLnNlYWRuLmlvL2djcy9maWxlcy9lMzY5ZmE1MWJhMjhkNWRhZWNkODM3Y2IwY2JmYWJmZS5wbmc/dz01MDAmYXV0bz1mb3JtYXQ=',
            coverURL: 'https://i.seadn.io/gcs/files/6b26248d4c1d8eb42e9f9e631636164a.jpg?w=1440&auto=format',
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
                name: 'NFTGTA',
            }
        };
    }

    const { data } = await api.get<Collection>(`/collection/get/${collectionID}`);

    return data;
}
