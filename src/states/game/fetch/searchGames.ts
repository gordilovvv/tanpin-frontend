import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

export async function searchGames(query: string, signal?: AbortSignal): Promise<{
    ID: string
    name: string
    logoURL: string
}[]> {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 200));

        return [
            { ID: '1', name: 'Introducing World App', logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pLnNlYWRuLmlvL2djcy9maWxlcy82M2E4NjAwNjhkMmMxYTI1NGE1ZmVjYjk0MzJmMjAwNC5naWY/dz01MDAmYXV0bz1mb3JtYXQ=' }
        ];
    }

    return api.get(
        `/search/collections/${query}`,
        { signal }
    );
}