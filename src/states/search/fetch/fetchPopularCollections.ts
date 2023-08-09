import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

type PopularCollections = {
    'ID': '18d1d892-b324-4edb-8446-b4b3e442dcb9',
    'name': 'GTA Cars',
    'logoURL': 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pLnNlYWRuLmlvL2djcy9maWxlcy9jMzg4ODQwYTcyOWU2MTgzZmMwYjNjN2YxZTlkNTgzOC5wbmc/dz01MDAmYXV0bz1mb3JtYXQ=',
    'gameID': 'c74cf62b-7b1b-47af-a154-54a3d64c9f1d'
}

/**
 * Function fetches popular collections for Search suggestions
 */
export async function fetchPopularCollections() {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 300));

        return [
            {
                'ID': '18d1d892-b324-4edb-8446-b4b3e442dcb9',
                'name': 'GTA Cars',
                'logoURL': 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pLnNlYWRuLmlvL2djcy9maWxlcy9jMzg4ODQwYTcyOWU2MTgzZmMwYjNjN2YxZTlkNTgzOC5wbmc/dz01MDAmYXV0bz1mb3JtYXQ=',
                'gameID': 'c74cf62b-7b1b-47af-a154-54a3d64c9f1d'
            }
        ] as PopularCollections[];
    }

    const { data } = await api.get<PopularCollections[]>('/search/collections.popular');

    return data;
}