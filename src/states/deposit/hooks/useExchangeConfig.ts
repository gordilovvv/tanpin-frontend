import useSWRImmutable from 'swr/immutable';
import { fetchExchangeConfig } from '../fetch/fetchExchangeConfig';

export function useExchangeConfig() {
    const { data, error, isLoading } = useSWRImmutable(
        ['exchangeConfig'],
        async () => {
            const { limits, maticDistribution, affiliateReward } = await fetchExchangeConfig();

            return {
                paymentLimits: limits,
                maticDistribution,
                affiliateReward
            };
        },
        { revalidateOnFocus: true }
    );

    return {
        error,
        isLoading,
        paymentLimits: data?.paymentLimits,
        maticDistribution: data?.maticDistribution,
        affiliateReward: data?.affiliateReward
    };
}