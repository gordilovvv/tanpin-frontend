import { useCallback, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { Address } from 'viem';
import { useWalletClient } from 'wagmi';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useContractCall, useERC20 } from './useContract';
import { useTokenAllowance } from './useTokenAllowance';
import { formatValueToRaw } from '@/utils/formatRawAmount';

export function useTokenApprove(
    tokenAddress: Address,
    tokenDecimals: number,
    spender?: Address,
    amountToApprove?: string
) {
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

        return hash;
    }, [amountToApprove, tokenAllowance, spender, tokenDecimals, walletClient, tokenContract, isApproved, isPreparing, callContract]);

    // const requiresToApprove = async () => {
    //     try {
    //         if (!address || !spender || !tokenContract || !amountToApprove) {
    //             throw new Error('Allowance call failed!');
    //         }

    //         const rawAllowance = await tokenContract.read.allowance([address, spender]);
    //         const allowance = formatValueFromRaw(rawAllowance, tokenDecimals);

    //         const shouldApproveAmount = new BigNumber(amountToApprove).minus(allowance);
    //         const isApproved = shouldApproveAmount.isLessThanOrEqualTo(0);

    //         return isApproved ? 0 : shouldApproveAmount.toString();
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