import { axios } from '@/app/api';
import { Collection, CollectionQueryBody, CollectionResponse } from '../types';
import { MOCK_API_CALLS } from '@/config';

export async function collectionFetch(body: CollectionQueryBody): Promise<CollectionResponse> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 3000));

        return {
            page: 1,
            countPage: 2,
            collections: [...Array(2).keys()].map(id => {
                return {
                    ID: `${ (id + (10 * (body?.pageNum ?? 0))) }`,
                    name: 'Hello',
                    description: 'World',
                    logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
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
                    attributes: []
                } as Collection;
            })
        };
    }

    const { data } = await axios.post<CollectionResponse>('/collections.get.list', body);
    
    return data;
}

