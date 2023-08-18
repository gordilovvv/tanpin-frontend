import { useCallback, useState } from 'react';
import { ActionButton } from './ActionButton';
import { ErrorMessageModal, LoadingModal, UpdateSaleModal } from '@/components/Modals';
import { useOpenedState } from '@/hooks/useOpenedState';
import { useNFTRefetch } from '@/states/nft/hooks/useNFTFetch';
import { useContractCall, useMarketContract } from '@/hooks/useContract';
import { useUpdateDirectSaleStore } from '@/states/sale/store';
import { usePendingTransactionModal } from '@/states/global/hooks';
import { CONTRACTS } from '@/config/constants/contracts';
import { formatValueToRaw } from '@/utils/formatRawAmount';
import { activeChainId } from '@/config/chain';
import { logError } from '@/utils/sentry';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';

type UpdateSaleButtonProps = {
    nftID: string,
    saleID: string,
    currentPrice: string
}

export function UpdateSaleButton({ nftID, saleID, currentPrice }: UpdateSaleButtonProps) {
    const { refetchNFT } = useNFTRefetch(nftID);
    const { callContract } = useContractCall();
    const marketContract = useMarketContract();
    const updateSaleModal = useOpenedState();
    const pendingTransactionModal = usePendingTransactionModal();

    const [price, setPrice] = useUpdateDirectSaleStore(state => [
        state.price,
        state.setPrice
    ]);

    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUpdateSale = useCallback(async () => {
        try {
            if (!marketContract) {
                throw new Error('Update sale is not ready!');
            }

            const rawPrice = formatValueToRaw(
                price,
                CONTRACTS.usdt[activeChainId].decimals
            );

            if (rawPrice <= 0) {
                throw new Error('The new price of the NFT must be greater than 0!');
            }

            setIsLoading(true);

            const { hash } = await callContract({
                contract: marketContract,
                method: 'updateDirectSale',
                args: [BigInt(saleID), rawPrice]
            });

            pendingTransactionModal.open({
                hash,
                text: 'The NFT price is successfully changed. Updates will appear as soon as transaction is confirmed.',
                onConfirm: refetchNFT
            });
        } catch (error) {
            logError(error);
            setError(walletErrorToUserReadableMessage(error));
        } finally {
            setIsLoading(false);
        }
    }, [marketContract, saleID, price, setIsLoading, callContract, refetchNFT, pendingTransactionModal.open, setPrice, setError]);

    const handleOpenModal = () => {
        setPrice('');
        updateSaleModal.open();
    };

    const handleConfirmSale = useCallback(() => {
        updateSaleModal.close();
        handleUpdateSale();
    }, [updateSaleModal.close, handleUpdateSale]);

    return (
        <>
            <ActionButton
                view='secondary'
                onClick={handleOpenModal}
            >
                Change price
            </ActionButton>

            <UpdateSaleModal
                isOpen={updateSaleModal.isOpen}
                currentPrice={currentPrice}
                onClose={updateSaleModal.close}
                onConfirm={handleConfirmSale}
            />

            <LoadingModal
                isOpen={isLoading}
                text='Please confirm the transaction in your wallet to update the NFT price.'
            />

            <ErrorMessageModal
                isOpen={!!error}
                error={error}
                onClose={() => setError(undefined)}
            />
        </>
    );
}