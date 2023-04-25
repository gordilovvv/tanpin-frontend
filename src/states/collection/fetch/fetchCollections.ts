import { axios } from '@/app/api';
import { CollectionQueryBody, CollectionResponse } from '../types';
import { MOCK_API_CALLS } from '@/config';

export async function collectionFetch(body: CollectionQueryBody): Promise<CollectionResponse> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 400));
        return {
            // @ts-ignore
            collections: [...Array(10).keys()].map(id => ({
                ID: (id + (10 * (body?.pageNum ?? 0))),
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
            }))
        };
    }

    const { data } = await axios.post<CollectionResponse>('/collections.get.list', body);
    return data;
}

