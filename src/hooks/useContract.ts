import { useMemo } from 'react';
import { useProviderOrSigner } from './useProviderOrSigner';
import { Contract } from 'ethers';
import { ERC20_ABI } from '@/config/ABI/erc20';

function useContract<T extends Contract = Contract>(
    address: string,
    ABI: any,
    withSignerIfPossible = true
): T {
    const providerOrSigner = useProviderOrSigner(withSignerIfPossible);
  
    return useMemo(() => {
        return new Contract(
            address,
            ABI,
            providerOrSigner
        );
    }, [address, ABI, providerOrSigner]) as T;
}

export function useERC20(address: string, useSignerIfPossible: boolean) {
    return useContract(
        address,
        ERC20_ABI,
        useSignerIfPossible
    );
}