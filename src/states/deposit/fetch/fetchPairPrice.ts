import { gateApi } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

type PairPriceResponse = string;

export async function fetchPairPrice(currencyId: string) {
    if (MOCK_API_CALLS) {
        return '91.04';
    }

    const { data } = await gateApi.get<PairPriceResponse>(`/currency-rate?currency=${currencyId}`);

    return data;
}