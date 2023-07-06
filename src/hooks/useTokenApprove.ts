import { useCallback, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { Address } from 'viem';
import { useWalletClient } from 'wagmi';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useContractCall, useERC20 } from './useContract';
import { useTokenAllowance } from './useTokenAllowance';
import { formatValueToRaw } from '@/utils/formatRawAmount';

export function useTokenApprove({ tokenAddress, tokenDecimals, spender, amountToApprove }: {
    tokenAddress: Address,
    tokenDecimals: number,
    spender?: Address,
    amountToApprove?: string
}) {
    const { address } = useAccount();
    const { callContract } = useContractCall();
    const { data: walletClient } = useWalletClient();

    const tokenContract = useERC20(tokenAddress);
    const tokenAllowance = useTokenAllowance(
        tokenAddress,
        tokenDecimals,
        address,
        spender
    );

    const isPreparing = tokenAllowance === null || !walletClient;
    const isApproved = useMemo(() => {
        if (!amountToApprove || !tokenAllowance) {
            return false;
        }

        return new BigNumber(tokenAllowance).isGreaterThanOrEqualTo(amountToApprove);
    }, [amountToApprove, tokenAllowance]);

    const approve = useCallback(async () => {
        if (isPreparing) {
            throw new Error('Approve was called unnecessarily!');
        }

        if (isApproved) {
            throw new Error('Tokens have been already approved!');
        }

        if (!amountToApprove || !tokenContract || !spender || !tokenAllowance) {
            throw new Error('Approving is not ready!');
        }

        const tokenAmount = new BigNumber(amountToApprove).minus(tokenAllowance).toString();
        const rawAmountToApprove = formatValueToRaw(tokenAmount, tokenDecimals);

        const { hash } = await callContract({
            contract: tokenContract,
            method: 'approve',
            args: [spender, BigInt(rawAmountToApprove)]
        });

        return { hash };
    }, [amountToApprove, tokenAllowance, spender, tokenDecimals, walletClient, tokenContract, isApproved, isPreparing, callContract]);

    // const isTokensApproved = async () => {
    //     try {
    //         if (!address || !spender || !tokenContract || !amountToApprove) {
    //             throw new Error('Allowance call failed!');
    //         }

    //         const allowance = await tokenContract.read.allowance([
    //             address,
    //             spender
    //         ]);

    //         const amountToApproveRaw = formatValueToRaw(
    //             amountToApprove,
    //             tokenDecimals
    //         );

    //         const amountForApprove = amountToApproveRaw - allowance;

    //         return amountForApprove;
    //     } catch (error) {
    //         return amountToApprove;
    //     }
    // };

    return {
        approve,
        isApproved,
        isPreparing
    };
}

// export function useTokenApprove({ tokenAddress, tokenDecimals, spender }: {
//     tokenAddress: Address,
//     tokenDecimals: number,
//     spender?: Address
// }) {
//     const { address } = useAccount();
//     const { callContract } = useContractCall();
//     const tokenContract = useERC20(tokenAddress);

//     /**
//      * Approve ERC20 Tokens
//      */
//     const approve = useCallback(async (amount: string) => {
//         if (!tokenContract || !spender) {
//             throw new Error('Approving is not ready!');
//         }

//         const rawAmount = formatValueToRaw(amount, tokenDecimals);

//         const { hash } = await callContract({
//             contract: tokenContract,
//             method: 'approve',
//             args: [spender, BigInt(rawAmount)]
//         });

//         return { hash };
//     }, [spender, tokenDecimals, tokenContract, callContract]);

//     /**
//      * Returns amount required for approval. 
//      *  `If you need 40 approved tokens and you already have approved 10 tokens,
//      * the function will return 30 tokens.`
//      */
//     const requiredApproveAmount = useCallback(async (amountToApprove: string) => {
//         try {
//             if (!address || !spender || !tokenContract) {
//                 throw new Error('Allowance call failed!');
//             }

//             const allowance = await tokenContract.read.allowance([
//                 address,
//                 spender
//             ]);

//             const amountToApproveRaw = formatValueToRaw(amountToApprove, tokenDecimals);
//             const requiredAmount = amountToApproveRaw - allowance;

//             if (requiredAmount <= 0) {
//                 return '0';
//             }

//             return formatValueFromRaw(requiredAmount, tokenDecimals);
//         } catch (error) {
//             return amountToApprove;
//         }
//     }, [address, spender, tokenContract, tokenDecimals]);

//     return {
//         approve,
//         requiredApproveAmount
//     };
// }