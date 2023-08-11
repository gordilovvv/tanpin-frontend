import { api } from '@/app/api';
import { v4 as uuid } from 'uuid';
import { sample } from 'lodash';
import { MOCK_API_CALLS } from '@/config';
import { Collection } from '@/states/collection/types';
import { CollectionsFilterState } from '../CollectionsFilterStore';

type Response = {
    /** Total number of collections */
    counts: number
    /** Array of collections */
    collections: Collection[]
}

export async function fetchCollectionsList(params: {
    filter: CollectionsFilterState,
    offset: number,
    limit: number
}): Promise<{ items: Collection[], total: number }> {
    {
        if (MOCK_API_CALLS) {
            await new Promise((res) => setTimeout(res, 300));

            const total = 300;

            return {
                total,
                items: [...Array(params.limit).keys()].map(() => {
                    return {
                        ID: uuid(),
                        name: sample([
                            'The Sandbox',
                            'RingRunnerz',
                            'Cross The Ages - Arkhante Premium Pack',
                            'Trump Digital Trading Cards'
                        ]),
                        description: 'World',
                        logoURL: sample([
                            'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvYmFmeWJlaWV1d3BvdGVodXBqYzVyd21jcGEzbXRiZ293aGt4dmI2bjRhcjR1YjQyanhkcHBoZ3Z4dGE=',
                            'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvYmFmeWJlaWQzbHl0YXNhNGFhdWF5bDJrNXBtdXl2Nm1nZGNzcTNwb3Zkd2o3NndiYTZ6azdscTR5b2U=',
                            'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZeGIxODZnOWhUbzZWNDVDbnA5S1R1UDFRekZIWEt2MVg3UFptRjY1RTRrcA==',
                            'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvYmFmeWJlaWg1bXNhMjNpNDdiYnluZG9ja2FlYjd5YnBheDR1azc0NzVtcmVpcG8yN2oydmJ3eGhmaHE=',
                            'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1XU3U3NlJFMmpzdW44Q2g4ZjNLenozTXVYcjdaaGNiYlZMMUVLeERLc1E4Vg=='
                        ]),
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
                            ID: '0',
                            name: 'GTA'
                        }
                    } as Collection;
                })
            };
        }

        const { data } = await api.post<Response>('/collection/get.list', params);

        return {
            total: data.counts,
            items: data.collections
        };
    }
}
