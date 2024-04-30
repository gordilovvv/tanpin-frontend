import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { urlSearchParams } from '@/utils/searchParams';
import { ActivityCategory, ActivityFilter, ActivityTransaction } from '../types';

export async function fetchActivity({
    filter,
    category
}: {
    filter: ActivityFilter,
    category: ActivityCategory
}): Promise<ActivityTransaction[]> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 300));

        return [];
    }

    const searchParams = urlSearchParams({
        address: filter.address,
        tokenId: filter.tokenID,
        types: filter.types.join(','),
        offset: 0,
        limit: 100
    });

    const url = `/activity/${category}?${searchParams}`;
    const { data } = await api.get<ActivityTransaction[]>(url);

    return data;
}
