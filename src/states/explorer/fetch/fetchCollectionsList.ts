import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { Collection, CollectionRes } from '@/states/collection/types';
import { CollectionsFilterState } from '../CollectionsFilterStore';
import { urlSearchParams } from '@/utils/searchParams';

type Response = {
    total: number
    collections: CollectionRes[]
}

export async function fetchCollectionsList(params: {
    filter?: CollectionsFilterState,
    offset?: number,
    limit?: number
}): Promise<{ items: Collection[], total: number }> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 300));

        return {
            total: 0,
            items: []
        };
    }

    const { filter, offset, limit } = params;
    const searchParams = urlSearchParams({
        gameI: filter?.gameID,
        sort: filter?.sort,
        limit,
        offset
    });

    const { data } = await api.get<Response>(`/collections/get.list?${searchParams}`);
    const collections: Collection[] = [];

    for (const { id, gameId, ...collection } of data.collections) {
        collections.push({
            ID: id,
            gameID: gameId,
            ...collection
        });
    }

    return {
        total: data.total,
        items: collections
    };
}
