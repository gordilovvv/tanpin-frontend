import { activeChainId } from '@/config/chain';
import { useMemo } from 'react';
import { useProvider, useSigner } from 'wagmi';
import { useAccount } from '@/states/user/hooks/useAccount';

export function useProviderOrSigner(useSignerIfPossible = true) {
    const provider = useProvider({ chainId: activeChainId });
    
    const { address, isConnected } = useAccount();
    const { data: signer } = useSigner();
  
    return useMemo(
        () => (useSignerIfPossible && address && isConnected && signer ? signer : provider),
        [address, isConnected, provider, signer, useSignerIfPossible]
    );
}