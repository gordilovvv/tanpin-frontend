import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { CollectionResWithAttributes, CollectionWithAttributes } from '../types';

export async function fetchCollection(collectionID: string): Promise<CollectionWithAttributes> {
    if (MOCK_API_CALLS) {
        return {
            ID: '1',
            name: 'YAYO NFT',
            chain: 'Polygon',
            address: '0x123',
            description: 'YAYO NFT is a collection of 4000 YAYO Men embodying the furthest archetypes of power, speed, violence, wealth, chaos, and adventure. YAYO is a tribute to the vehicles, equipment, and aesthetics that have captured the hearts and minds of young men for generations.',
            logoUrl: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pLnNlYWRuLmlvL2djcy9maWxlcy9lMzY5ZmE1MWJhMjhkNWRhZWNkODM3Y2IwY2JmYWJmZS5wbmc/dz01MDAmYXV0bz1mb3JtYXQ=',
            coverUrl: 'https://i.seadn.io/gcs/files/6b26248d4c1d8eb42e9f9e631636164a.jpg?w=1440&auto=format',
            attributes: [
                { traitType: 'Hat', values: ['Red', 'Blue', 'Orange'] },
                { traitType: 'Jacket', values: ['Small', 'Medium', 'Large'] }
            ],
            gameID: '1',
            gameName: 'Game',
            createdAt: ''
        };
    }

    const response = await api.get<CollectionResWithAttributes>(`/collection/${collectionID}`);

    const { id, gameId, ...data } = response.data;
    const collection: CollectionWithAttributes = {
        ID: id,
        gameID: gameId,
        ...data
    };

    return collection;
}
