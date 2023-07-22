import { useCallback, useRef } from 'react';
import BigNumber from 'bignumber.js';
import { Address } from 'viem';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useContractCall, useERC20 } from './useContract';
import { formatValueFromRaw, formatValueToRaw } from '@/utils/formatRawAmount';

export function useTokenApprove({ tokenAddress, tokenDecimals, spender, amountToApprove }: {
    tokenAddress: Address,
    tokenDecimals: number,
    spender?: Address,
    amountToApprove?: string
}) {
    const { address } = useAccount();
    const { callContract } = useContractCall();
    const tokenContract = useERC20(tokenAddress);
    const remainingApproveAmount = useRef<string | undefined>();

    const approve = useCallback(async () => {
        if (!remainingApproveAmount.current) {
            throw new Error('Approve was called unnecessarily!');
        }

        if (!tokenContract || !spender) {
            throw new Error('Approving is not ready!');
        }

        const rawAmountToApprove = formatValueToRaw(
            remainingApproveAmount.current,
            tokenDecimals
        );

        const { hash } = await callContract({
            contract: tokenContract,
            method: 'approve',
            args: [spender, BigInt(rawAmountToApprove)]
        });

        return { hash };
    }, [spender, remainingApproveAmount, tokenDecimals, tokenContract, callContract]);

    const checkApproved = useCallback(async () => {
        if (!tokenContract || !address || !spender || !amountToApprove) {
            throw new Error('getApprovedTokens was called unnecessarily!');
        }

        const rawAllowance = await tokenContract.read.allowance([
            address,
            spender
        ]);

        const allowance = formatValueFromRaw(rawAllowance, tokenDecimals);
        const remainingApprovedTokens = new BigNumber(amountToApprove).minus(allowance);

        const approvedRequired = remainingApprovedTokens
            .isGreaterThan(0);

        remainingApproveAmount.current = approvedRequired
            ? remainingApprovedTokens.toString()
            : undefined;

        return !approvedRequired;
    }, [tokenContract, tokenDecimals, address, spender, amountToApprove, tokenContract, remainingApproveAmount]);

    return {
        approve,
        checkApproved
    };
}

// export function useTokenApprove({ tokenAddress, tokenDecimals, spender, amountToApprove }: {
//     tokenAddress: Address,
//     tokenDecimals: number,
//     spender?: Address,
//     amountToApprove?: string
// }) {
//     const { address } = useAccount();
//     const { callContract } = useContractCall();
//     const { data: walletClient } = useWalletClient();

//     const tokenContract = useERC20(tokenAddress);
//     const tokenAllowance = useTokenAllowance(
//         tokenAddress,
//         tokenDecimals,
//         address,
//         spender
//     );

//     const isPreparing = tokenAllowance === null || !walletClient;
//     const isApproved = useMemo(() => {
//         if (!amountToApprove || !tokenAllowance) {
//             return false;
//         }

//         return new BigNumber(tokenAllowance).isGreaterThanOrEqualTo(amountToApprove);
//     }, [amountToApprove, tokenAllowance]);

//     const approve = useCallback(async () => {
//         if (isPreparing) {
//             throw new Error('Approve was called unnecessarily!');
//         }

//         if (isApproved) {
//             throw new Error('Tokens have been already approved!');
//         }

//         if (!amountToApprove || !tokenContract || !spender || !tokenAllowance) {
//             throw new Error('Approving is not ready!');
//         }

//         const tokenAmount = new BigNumber(amountToApprove).minus(tokenAllowance).toString();
//         const rawAmountToApprove = formatValueToRaw(tokenAmount, tokenDecimals);

//         const { hash } = await callContract({
//             contract: tokenContract,
//             method: 'approve',
//             args: [spender, BigInt(rawAmountToApprove)]
//         });

//         return { hash };
//     }, [amountToApprove, tokenAllowance, spender, tokenDecimals, walletClient, tokenContract, isApproved, isPreparing, callContract]);

//     return {
//         approve,
//         isApproved,
//         isPreparing
//     };
// }