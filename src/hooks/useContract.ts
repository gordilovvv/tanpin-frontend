import { useCallback, useMemo } from 'react';
import { erc20ABI, useWalletClient } from 'wagmi';
import { Abi, Account, Address, CallParameters, Chain, GetContractReturnType, GetFunctionArgs, InferFunctionName, SimulateContractParameters, getContract } from 'viem';
import { viemClient } from '@/config/viem';
import { activeChainId } from '@/config/chain';
import { marketABI } from '@/config/ABI/market';
import { erc1155ABI } from '@/config/ABI/erc1155';
import { CONTRACTS } from '@/config/constants/contracts';
import { SendTransactionReturnType } from 'viem';
import { GetWalletClientResult } from 'wagmi/actions';

export type Contract<TAbi extends Abi> = GetContractReturnType<TAbi, typeof viemClient, GetWalletClientResult | undefined> & {
    account?: Account
    chain?: Chain
    abi: TAbi
    address: Address
}

export function useContract<TAbi extends Abi>(address: Address, abi: TAbi): Contract<TAbi> | null {
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

export function useERC1155(address: Address) {
    return useContract(address, erc1155ABI);
}

export function useMarketContract() {
    return useContract(CONTRACTS.market[activeChainId], marketABI);
}

export function useContractCall() {
    const { data: walletClient } = useWalletClient();

    const callContract = useCallback(async <
        TAbi extends Abi,
        TFunctionName extends string
    >({
        contract,
        method,
        args,
        config = {}
    }: {
        contract: Contract<TAbi>
        method: InferFunctionName<TAbi, TFunctionName>
        args: GetFunctionArgs<TAbi, TFunctionName>['args']
        config?: Omit<CallParameters, 'chain' | 'to' | 'data'>
    }): Promise<{ hash: SendTransactionReturnType }> => {
        if (!walletClient) {
            throw new Error('No walletClient!');
        }

        const { request } = await viemClient.simulateContract({
            abi: contract.abi,
            address: contract.address,
            account: walletClient.account,
            functionName: method,
            args,
            value: 0n,
            ...config
        } as unknown as SimulateContractParameters);

        const hash = await walletClient.writeContract(request);

        return { hash };
    }, [walletClient]);

    return { callContract };
}