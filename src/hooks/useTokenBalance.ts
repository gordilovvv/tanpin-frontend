import useSWRImmutable from 'swr/immutable';
import { Address } from 'viem';
import { useERC20 } from './useContract';
import { useAccount } from '@/states/user/hooks/useAccount';
import { formatValueFromRaw } from '@/utils/formatRawAmount';
import { FAST_INTERVAL } from '@/config/constants';

export function useTokenBalance(tokenAddress: Address, decimals: number) {
    const { address: account } = useAccount();
    const contract = useERC20(tokenAddress);

    const { data, isLoading } = useSWRImmutable(
        ['fetchTokenBalance', tokenAddress, account],
        async () => {
            if (!contract || !account) {
                return null;
            }

            const balance = await contract.read.balanceOf([account]);

            if (typeof balance === 'bigint') {
                const amount = formatValueFromRaw(balance.toString(), decimals);
                const rawAmount = balance.toString();

                return {
                    amount,
                    rawAmount
                };
            }
        },
        {
            dedupingInterval: FAST_INTERVAL,
            refreshInterval: FAST_INTERVAL,
            revalidateOnFocus: true,
            revalidateOnMount: true
        }
    );

    return {
        amount: data?.amount,
        rawAmount: data?.rawAmount,
        isLoading
    };
}