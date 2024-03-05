import useSWRImmutable from 'swr/immutable';
import { fetchPairPrice } from '../fetch/fetchPairPrice';

/**
 * `null` - loading
 * `undefined` - error
 */
export function useFetchPairRate(inputCurrencyId?: string) {
    const { data, error, isLoading } = useSWRImmutable(
        inputCurrencyId
            ? [`deliveredPairRate:${inputCurrencyId}`]
            : null,
        async () => {
            const pairPrice = await fetchPairPrice(inputCurrencyId!);

            return pairPrice;
        },
        {
            refreshInterval: 5_000,
            dedupingInterval: 5_000
        }
    );

    if (!data && isLoading) {
        return null;
    }

    if (!data && error) {
        return undefined;
    }

    return data;
}