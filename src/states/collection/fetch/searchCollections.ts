import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

export async function searchCollections(query: string, signal?: AbortSignal): Promise<{
    ID: string
    name: string
    logoURL: string
}[]> {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 200));

        if (query === '1') {
            throw new Error('1234');
        }

        return [
            { ID: '1', name: 'Graffities by rektguy', logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1YVDhkMTJibm9mSndjbmFxc0NXaTRqYmI2TWNuU01CTjhwcDNYcnQyRUMyVg== ' }
        ];
    }

    const { data } = await api.get(
        `/search/tokens/${query}`,
        { signal }
    );

    return data;
}