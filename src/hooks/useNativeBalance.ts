import useSWRImmutable from 'swr/immutable';
import { Address } from 'wagmi';
import { fetchBalance } from 'wagmi/actions';
import { FAST_INTERVAL } from '@/config/constants';

export function useNativeBalance(address: Address) {
    const { data: amount, isLoading } = useSWRImmutable(
        ['nativeBalance', address],
        () => fetchBalance({
            address,
            formatUnits: 'ether'
        }),
        { refreshInterval: FAST_INTERVAL }
    );

    return {
        amount: amount?.formatted,
        rawAmount: amount?.value,
        isLoading
    };
}