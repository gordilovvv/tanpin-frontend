import { useState } from 'react';
import { ActionButton } from '../Button/ActionButton';
import { ErrorMessageModal } from '@/components/Modals';
import { LoadingModal } from '@/components/Modals';
import { useNFTFetch } from '@/states/nft/hooks/useNFTFetch';
import { useContractCall, useMarketContract } from '@/hooks/useContract';
import { usePendingTransactionModal } from '@/states/global/hooks';
import { logError } from '@/utils/sentry';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';

type DelistButtonProps = {
    nftID: string
    saleID: string
    text: string
}

export function DelistButton({ nftID, saleID, text }: DelistButtonProps) {
    const { refetchNFT } = useNFTFetch(nftID);
    const { callContract } = useContractCall();
    const marketContract = useMarketContract();
    const pendingTransactionModal = usePendingTransactionModal();
    const [isLoading, setIsLoading] = useState(false);
    const [transactionError, setTransactionError] = useState<string | undefined>();

    const handleDelist = async () => {
        try {
            if (!marketContract) {
                throw new Error('Delist is not ready!');
            }

            setIsLoading(true);

            const { hash } = await callContract({
                contract: marketContract,
                method: 'closeDirectSale',
                args: [BigInt(saleID)]
            });

            pendingTransactionModal.open({
                hash,
                text: 'Sale is successfully cancelled. Updates will appear as soon as transaction is confirmed.',
                onReceipt: refetchNFT
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
            <ActionButton
                view='secondary'
                onClick={handleDelist}
            >
                {text}
            </ActionButton>

            <LoadingModal
                isOpen={isLoading}
                text={'Please confirm the transaction in your wallet to cancel the sale.'}
            />

            <ErrorMessageModal
                isOpen={!!transactionError}
                error={transactionError}
                onClose={() => setTransactionError(undefined)}
            />
        </>
    );
}