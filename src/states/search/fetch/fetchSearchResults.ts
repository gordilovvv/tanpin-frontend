import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { urlSearchParams } from '@/utils/searchParams';

export enum SearchCategory {
    NFTS = 'nfts',
    COLLECTIONS = 'collections'
}

export type SearchedNFT = {
    address: string
    tokenID: number
    name: string
    imageURL: string
}

export type SearchedCollection = {
    id: string,
    name: string,
    imageURL: string
}

export type SearchedData =
    | SearchedNFT[]
    | SearchedCollection[];

export async function fetchSearchResults(category: SearchCategory, query: string): Promise<SearchedData> {
    if (MOCK_API_CALLS) {
        return [];
    }

    const searchParams = urlSearchParams({
        category,
        query
    });

    const url = `/common/search?${searchParams}`;
    const { data } = await api.get<SearchedData>(url);

    return data;
}