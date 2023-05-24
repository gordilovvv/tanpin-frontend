import { api } from '@/app/api';

export async function fetchCollection(collectionID: string) {
    const { data } = await api.get(`collection/get/${collectionID}`);
    return data;
}
