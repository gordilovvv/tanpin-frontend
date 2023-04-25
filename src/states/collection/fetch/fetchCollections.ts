import { axios } from '@/app/api';
import { CollectionQueryBody, CollectionResponse } from '../types';

export const collectionFetch = async (body: CollectionQueryBody) => {
    const { data } = await axios.post<CollectionResponse>('/collections.get.list', body);
    return data;
};

