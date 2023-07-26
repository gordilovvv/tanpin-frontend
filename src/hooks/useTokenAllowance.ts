import useSWRImmutable from 'swr/immutable';
import { Address } from 'viem';
import { useERC20 } from './useContract';
import { FAST_INTERVAL } from '@/config/constants';
import { formatValueFromRaw } from '@/utils/formatRawAmount';

/**
 * Get approved amount of ERC-20 tokens
 * @returns null if loading
 */
export function useTokenAllowance(
    tokenAddress: Address,
    tokenDecimals: number,
    owner?: Address,
    spender?: Address
) {
    const contract = useERC20(tokenAddress);
    const { data: allowance, isLoading } = useSWRImmutable(
        ['token.allowance', tokenAddress, owner, spender],
        async () => {
            if (!contract || !owner || !spender) {
                return;
            }

            const allowance = await contract.read.allowance([
                owner,
                spender
            ]);

            return formatValueFromRaw(allowance, tokenDecimals);
        },
        { refreshInterval: FAST_INTERVAL, revalidateOnMount: true, revalidateOnFocus: true }
    );

    if (isLoading) {
        return null;
    }

    return allowance;
}