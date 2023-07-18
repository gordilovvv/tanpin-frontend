import useSWRImmutable from 'swr/immutable';
import { fetchPairPrice } from '../fetch/fetchPairPrice';

/**
 * `null` - loading
 * `undefined` - error
 */
export function useFetchPairRate() {
    const { data, error, isLoading } = useSWRImmutable(
        ['deliveredPairRate'],
        async () => {
            const pairPrice = await fetchPairPrice();

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