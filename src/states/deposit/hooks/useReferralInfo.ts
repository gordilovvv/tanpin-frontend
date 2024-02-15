import useSWRImmutable from 'swr/immutable';
import { useAccount } from '@/states/user/hooks/useAccount';
import { fetchReferralInfo } from '../fetch/fetchReferralInfo';
import { SLOW_INTERVAL } from '@/config/constants';

export function useReferralInfo() {
    const { address } = useAccount();
    const { data, error, isLoading } = useSWRImmutable(
        address
            ? ['referralInfo', address]
            : null,
        async () => {
            const data = await fetchReferralInfo(address!);

            return data;
        },
        { refreshInterval: SLOW_INTERVAL, revalidateOnFocus: true }
    );

    return {
        error,
        isLoading,
        referral: data
    };
}