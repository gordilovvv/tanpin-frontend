import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

type Response = {
    ID: string
    name: string
    imageURL: string
    gameID: string,
    collectionID: string
}[] | undefined;

export async function searchNFT(query: string, signal?: AbortSignal): Promise<Response> {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 200));

        return [
            {
                ID: '1',
                name: 'Porsche Cayenne',
                imageURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_image_preview/aHR0cHM6Ly9uZnRtZWRpYS5wYXJhbGxlbG5mdC5jb20vcGFyYWxlbC1hdmF0YXJzL3BlZWtpbmcvVW5yZXZlYWxlZC5wbmc=',
                gameID: '1',
                collectionID: '1'
            }
        ];
    }

    const { data } = await api.get<Response>(
        `/search/tokens/${query}`,
        { signal }
    );

    return data;
}