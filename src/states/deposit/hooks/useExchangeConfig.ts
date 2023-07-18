import useSWRImmutable from 'swr/immutable';
import { fetchExchangeConfig } from '../fetch/fetchExchangeConfig';

export function useExchangeConfig() {
    const { data, error, isLoading } = useSWRImmutable(
        ['exchangeConfig'],
        async () => {
            const { limits, maticDistribution } = await fetchExchangeConfig();

            return {
                paymentLimits: limits,
                maticDistribution
            };
        },
        { revalidateOnFocus: true }
    );

    return {
        error,
        isLoading,
        paymentLimits: data?.paymentLimits,
        maticDistribution: data?.maticDistribution,
    };
}