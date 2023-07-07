import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import useSWRImmutable from 'swr/immutable';
import { api } from '@/app/api';
import { CONTRACTS } from '@/config/constants/contracts';

/**
 * Get token amount price in USD
 * 
 * @returns null if loading
 * @returns undefined if can't get price
 * @returns string if everything okay
 */
export function useTokenAmountPrice(
    amount: string,
    tokenAddress: string,
    tokenSymbol: string
) {
    const { data: priceFromLlama, isLoading } = useSWRImmutable<number | undefined>(
        ['fiat-price-ethereum', tokenSymbol],
        async () => {
            // Testnet Contract
            if (tokenAddress === CONTRACTS['usdt']['80001'].address) {
                await new Promise<void>(r => setTimeout(r, 300));

                return 1;
            }

            const { data } = await api.get<{
                coins: {
                    [id: string]: {
                        decimals: number,
                        symbol: string,
                        price: number,
                        timestamp: number,
                        confidence: number
                    }
                }
            }>(`https://coins.llama.fi/prices/current/polygon:${tokenAddress}`);

            if (data?.coins?.[`polygon:${tokenAddress}`]?.confidence > 0.9) {
                return data?.coins?.[`polygon:${tokenAddress}`].price;
            }

            return undefined;
        },
        {
            dedupingInterval: 30_000,
            refreshInterval: 30_000,
        }
    );

    const price = useMemo(() => {
        if (isLoading) {
            return null;
        }

        if (!amount || !priceFromLlama) {
            return undefined;
        }

        return new BigNumber(amount).times(priceFromLlama).toString();
    }, [amount, isLoading, priceFromLlama]);

    return price;
}