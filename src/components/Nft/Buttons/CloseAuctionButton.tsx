import { Button, ButtonProps } from '@/uikit';
import { LoadingModal, ErrorMessageModal } from '@/components/Modals';
import { useContractCall, useMarketContract } from '@/hooks/useContract';
import { usePendingTransactionModal } from '@/states/global/hooks';
import { useState } from 'react';
import { logError } from '@/utils/sentry';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';

type CloseAuctionButtonProps = {
    text: string,
    loadingText: string,
    pendingTransactionText: string,
    auctionID: string,
    onSuccess?: () => void
} & Omit<ButtonProps<'button'>, 'children'>;

export function CloseAuctionButton({ auctionID, text, loadingText, pendingTransactionText, onSuccess, ...props }: CloseAuctionButtonProps) {
    const { callContract } = useContractCall();
    const marketContract = useMarketContract();
    const pendingTransactionModal = usePendingTransactionModal();
    const [isLoading, setIsLoading] = useState(false);
    const [transactionError, setTransactionError] = useState<string | undefined>();

    const handleClick = async () => {
        try {
            if (!marketContract) {
                throw new Error('Delist is not ready!');
            }

            setIsLoading(true);

            const { hash } = await callContract({
                contract: marketContract,
                method: 'closeAuctionSale',
                args: [BigInt(auctionID)]
            });

            pendingTransactionModal.open({
                hash,
                text: pendingTransactionText,
                onReceipt: onSuccess
            });
        } catch (error) {
            logError(error);
            setTransactionError(walletErrorToUserReadableMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                {...props}
                onClick={handleClick}
            >
                {text}
            </Button>

            <LoadingModal
                isOpen={isLoading}
                text={loadingText}
            />

            <ErrorMessageModal
                isOpen={!!transactionError}
                error={transactionError}
                onClose={() => setTransactionError(undefined)}
            />
        </>
    );
}