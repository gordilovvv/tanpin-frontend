import { useMemo } from 'react';
import { erc20ABI, useWalletClient } from 'wagmi';
import { Abi, Address, getContract } from 'viem';
import { viemClient } from '@/config/viem';

export function useContract<TAbi extends Abi>(address: Address, abi: TAbi) {
    const { data: signer } = useWalletClient();
  
    return useMemo(() => {
        try {
            const viemContract = getContract({
                abi,
                address,
                publicClient: viemClient,
                walletClient: signer || undefined
            });

            return {
                ...viemContract,
                account: signer?.account,
                chain: signer?.chain,
                abi,
                address
            };
        } catch (error) {
            console.error('Failed to get contract', error);

            return null;
        }
    }, [address, abi, signer]);
}

export function useERC20(address: Address) {
    return useContract(address, erc20ABI);
}