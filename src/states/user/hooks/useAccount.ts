import { PublicClient, useAccount as useAccountWagmi } from 'wagmi';
import { useUserStore } from '../store';
import { GetAccountResult } from 'wagmi/actions';

/**
 * useAccount - wagmi's modified version. We want to check accessToken for isConnected
 */
export function useAccount() {
    const {isConnected, ...rest } = useAccountWagmi();
    const hasAccessToken = useUserStore(state => !!state.accessToken);

    return {
        ...rest,
        isConnected: hasAccessToken && isConnected
    } as GetAccountResult<PublicClient>;
}