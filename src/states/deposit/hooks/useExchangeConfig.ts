import useSWRImmutable from 'swr/immutable';
import { fetchExchangeConfig } from '../fetch/fetchExchangeConfig';

export function useExchangeConfig() {
    const { data, error, isLoading } = useSWRImmutable(
        ['exchangeConfig'],
        async () => {
            const { inputCurrencies, outputCurrencies, maticDistribution, affiliateReward } = await fetchExchangeConfig();

            return {
                inputCurrencies,
                outputCurrencies,
                maticDistribution,
                affiliateReward
            };
        },
        { revalidateOnFocus: true }
    );

    return {
        error,
        isLoading,
        inputCurrencies: data?.inputCurrencies,
        outputCurrencies: data?.outputCurrencies,
        maticDistribution: data?.maticDistribution,
        affiliateReward: data?.affiliateReward
    };
}