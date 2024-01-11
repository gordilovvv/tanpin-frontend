import { useCallback, useState } from 'react';
import { Button } from '@/uikit';
import { ErrorMessageModal, LoadingModal } from '@/components/Modals';
import { useContractCall, useLockerContract } from '@/hooks/useContract';
import { logError } from '@/utils/sentry';
import { formatTokenAmountV2 } from '@/utils/formatTokenAmount';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';

type ClaimButtonProps = {
    lockId?: string,
    amount?: string,
    onClaimSent: (lockId: string) => void
}

export function ClaimButton({ lockId, amount, onClaimSent }: ClaimButtonProps) {
    const { callContract } = useContractCall();
    const lockerContract = useLockerContract();
    const [isLoading, setIsLoading] = useState(false);
    const [transactionError, setTransactionError] = useState<string | undefined>();

    const handleClaim = useCallback(async () => {
        try {
            if (!lockerContract || !lockId) {
                throw new Error('Claim is not ready!');
            }

            setIsLoading(true);

            await callContract({
                contract: lockerContract,
                method: 'unlock',
                args: [BigInt(lockId)]
            });

            onClaimSent(lockId);
        } catch (error) {
            logError(error);
            setTransactionError(walletErrorToUserReadableMessage(error));
        } finally {
            setIsLoading(false);
        }
    }, [lockerContract, lockId, setIsLoading, callContract, onClaimSent]);

    return (
        <>
            <Button
                disabled={!lockId}
                onClick={() => handleClaim()}
            >
                {lockId && amount ? `Claim ${formatTokenAmountV2(amount, 'TANPIN')}` : 'No available unlocks'}
            </Button>

            <ErrorMessageModal
                isOpen={!!transactionError}
                error={transactionError}
                onClose={() => setTransactionError(undefined)}
            />

            <LoadingModal
                isOpen={isLoading}
                text={'Please confirm the transaction in your wallet to claim TANPIN tokens.'}
            />
        </>
    );
}