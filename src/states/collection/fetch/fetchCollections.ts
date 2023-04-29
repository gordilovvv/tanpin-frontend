import { axios } from '@/app/api';
import { Collection, CollectionQueryBody, CollectionResponse } from '../types';
import { MOCK_API_CALLS } from '@/config';
import { PAGE_SIZE } from '@/config/constants';

export async function collectionFetch(body: CollectionQueryBody): Promise<CollectionResponse> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 300));

        return {
            page: body.pageNum,
            countPage: 2,
            collections: [...Array(PAGE_SIZE).keys()].map(id => {
                return {
                    ID: `${(id + (10 * (body?.pageNum ?? 0)))}`,
                    name: `Hello ${ body.pageNum } ${ body.filter?.sort }`,
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

