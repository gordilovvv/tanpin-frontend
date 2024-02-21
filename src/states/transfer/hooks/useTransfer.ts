import { useCallback, useState } from 'react';
import { useTranslation } from '@/localization';
import { useTransferStore } from '../store';
import { useContractCall, useERC20 } from '@/hooks/useContract';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';
import { Address, parseUnits } from 'viem';
import { logError } from '@/utils/sentry';

export function useERC20TokenTransfer(
    address: Address,
    decimals: number,
    to: Address | undefined,
    amount: string | undefined,
    onResult?: () => void
) {
    const { t } = useTranslation();
    const tokenContract = useERC20(address);
    const { callContract } = useContractCall();
    const [isLoading, setIsLoading] = useState(false);
    const [onTransactionSent, onTransactionError] = useTransferStore(state => [
        state.onTransactionSent,
        state.onTransactionError
    ]);

    const handleTransfer = useCallback(async () => {
        try {
            if (!tokenContract || !to || !amount) {
                throw new Error('Transfer is not ready!');
            }

            setIsLoading(true);

            const rawAmount = parseUnits(amount, decimals);

            if (BigInt(rawAmount) <= 0n) {
                throw new Error('Transfer amount should be greater than 0!');
            }

            const { hash } = await callContract({
                contract: tokenContract,
                method: 'transfer',
                args: [to, BigInt(rawAmount)]
            });

            onTransactionSent({
                hash,
                amount
            });
        } catch (error) {
            logError(error);
            onTransactionError(walletErrorToUserReadableMessage(error, t));
        } finally {
            setIsLoading(false);
            onResult?.();
        }
    }, [tokenContract, decimals, to, amount, setIsLoading, callContract, onTransactionError, onTransactionSent, onResult, t]);

    return {
        handleTransfer,
        isLoading
    };
}