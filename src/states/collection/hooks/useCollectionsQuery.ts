import useSWR from 'swr';
import { axios } from '@/app/api';
import { CollectionQueryBody, CollectionResponse } from '../types';

async function collectionFetch(body: CollectionQueryBody) {
    const { data } = await axios.post<CollectionResponse>('/collections.get.list', body);
    return data;
}

export const useCollectionQuery = (body: CollectionQueryBody) => {
    // TODO Igor swr key
    const { data, error, isLoading } = useSWR(
        `/collections/page/${body.pageNum}`,
        () => collectionFetch(body)
    );

    return {
        collection: data,
        error,
        isLoading
    };
};
