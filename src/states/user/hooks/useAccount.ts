import { PublicClient, useAccount as useAccountWagmi } from 'wagmi';
import { GetAccountResult } from 'wagmi/actions';
import { useUserStore } from '../store';

/**
 * useAccount - wagmi's modified version
 */
export function useAccount() {
    const { isConnected, ...rest } = useAccountWagmi();
    const loginSigned = useUserStore(state => state.loginSigned);

    return {
        ...rest,
        isConnected: loginSigned && isConnected
    } as GetAccountResult<PublicClient>;
}