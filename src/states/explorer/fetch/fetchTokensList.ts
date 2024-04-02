import { api } from '@/app/api';
import { NFT } from '@/states/types';
import { TokensFilterState } from '../TokensFilterStore';
import { urlSearchParams } from '@/utils/searchParams';

type Response = {
    tokens: NFT[],
    total: number
}

export async function fetchTokensList(params: {
    collectionID?: string,
    ownerAddress?: string,
    offset: number,
    limit: number,
    filter?: TokensFilterState
}): Promise<{ items: NFT[], total: number }> {
    const { filter, ...baseParams } = params;
    const searchParams = urlSearchParams({
        ...baseParams,
        sort: filter?.sort,
        search: filter?.search
    });

    const { status, attributes } = filter ?? {};

    if (status && status !== 'all') {
        searchParams.append('status', status);
    }

    if (attributes?.length) {
        const attributesString = JSON.stringify(attributes.map(attr => [attr.traitType, attr.values]));
        searchParams.append('attributes', attributesString);
    }

    const url = `/tokens?${searchParams}`;
    const response = await api.get<Response>(url);

    return {
        items: response.data.tokens,
        total: response.data.total
    };
}