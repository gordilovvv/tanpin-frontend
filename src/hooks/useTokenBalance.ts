import useSWRImmutable from 'swr/immutable';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useERC20 } from './useContract';
import { useAccount } from '@/states/user/hooks/useAccount';
import { formatValueFromRaw } from '@/utils/formatRawAmount';
import { FAST_INTERVAL } from '@/config/constants';

export function useTokenBalance(tokenAddress: string, decimals: number) {
    const { address: account } = useAccount();
    const contract = useERC20(tokenAddress, false);

    const fetchKey = useMemo(
        () => account
            ? {
                tokenAddress,
                methodName: 'balanceOf',
                params: [account]
            }
            : null,
        [tokenAddress, account, contract]
    );

    const { data, isLoading } = useSWRImmutable(fetchKey, async (request) => {
        if (!request) {
            return null;
        }
        
        const {
            methodName,
            params
        } = request;

        const balance = await contract[methodName](...params) as BigNumber | undefined;

        if (balance) {
            const amount = formatValueFromRaw(balance.toString(), decimals);
            const rawAmount = balance.toString();

            return {
                amount,
                rawAmount
            };
        }
    }, { refreshInterval: FAST_INTERVAL });

    return {
        amount: data?.amount,
        rawAmount: data?.rawAmount,
        isLoading
    };
}