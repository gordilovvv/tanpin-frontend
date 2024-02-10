import { useCallback, useState } from 'react';
import { useNetwork } from 'wagmi';
import { Button } from '@/uikit';
import { ErrorMessageModal, LoadingModal } from '@/components/Modals';
import { useContractCall, useLockerContract } from '@/hooks/useContract';
import { useWrongNetworkModal } from '@/states/global/hooks';
import { useTranslation } from '@/localization';
import { activeChainId } from '@/config/chain';
import { logError } from '@/utils/sentry';
import { formatTokenAmountV2 } from '@/utils/formatTokenAmount';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';
import styles from './ClaimButton.module.scss';

type ClaimButtonProps = {
    lockId?: string,
    amount?: string,
    onClaimSent: (lockId: string) => void
}

export function ClaimButton({ lockId, amount, onClaimSent }: ClaimButtonProps) {
    const { t, locale } = useTranslation();
    const { callContract } = useContractCall();
    const lockerContract = useLockerContract();
    const [isLoading, setIsLoading] = useState(false);
    const [transactionError, setTransactionError] = useState<string | undefined>();

    const { chain } = useNetwork();
    const wrongNetworkModal = useWrongNetworkModal();
    const isWrongChain = chain?.id !== activeChainId;

    const handleClaim = useCallback(async () => {
        if (isWrongChain) {
            return wrongNetworkModal.open();
        }

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
            setTransactionError(walletErrorToUserReadableMessage(error, t));
        } finally {
            setIsLoading(false);
        }
    }, [lockerContract, lockId, isWrongChain, setIsLoading, callContract, onClaimSent, wrongNetworkModal.open, t]);

    return (
        <>
            <Button
                className={styles.button}
                disabled={!lockId}
                onClick={() => handleClaim()}
            >
                {lockId && amount ? `${t('Claim')} ${formatTokenAmountV2(amount, locale, 'TANPIN')}` : t('No available unlocks')}
            </Button>

            <ErrorMessageModal
                isOpen={!!transactionError}
                error={transactionError}
                onClose={() => setTransactionError(undefined)}
            />

            <LoadingModal
                isOpen={isLoading}
                text={t('Please confirm the transaction in your wallet to claim TANPIN tokens.')}
            />
        </>
    );
}