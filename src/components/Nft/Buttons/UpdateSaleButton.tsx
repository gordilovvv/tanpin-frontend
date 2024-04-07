import { useCallback, useState } from 'react';
import { ErrorMessageModal, LoadingModal, UpdateSaleModal } from '@/components/Modals';
import { ActionButton } from './ActionButton';
import { useTranslation } from '@/localization';
import { useOpenedState } from '@/hooks/useOpenedState';
import { useCurrency } from '@/hooks/useCurrency';
import { useNFTRefetch } from '@/states/nft/hooks/useNFTFetch';
import { useContractCall, useMarketContract } from '@/hooks/useContract';
import { useUpdateDirectSaleStore } from '@/states/sale/store';
import { usePendingTransactionModal } from '@/states/global/hooks';
import { formatValueToRaw } from '@/utils/formatRawAmount';
import { logError } from '@/utils/sentry';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';

type UpdateSaleButtonProps = {
    contractAddress: `0x${string}`
    tokenID: string
    saleID: string
    currentPrice: string
    currency: string
}

export function UpdateSaleButton({ contractAddress, tokenID, saleID, currentPrice, currency }: UpdateSaleButtonProps) {
    const { t } = useTranslation();
    const { refetchNFT } = useNFTRefetch(contractAddress, tokenID);
    const { callContract } = useContractCall();
    const marketContract = useMarketContract();
    const updateSaleModal = useOpenedState();
    const pendingTransactionModal = usePendingTransactionModal();

    const saleCurrency = useCurrency(currency);
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

            const rawPrice = formatValueToRaw(price, saleCurrency.decimals);

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
                text: t('The NFT price is successfully changed. Updates will appear as soon as transaction is confirmed.'),
                onConfirm: refetchNFT
            });
        } catch (error) {
            logError(error);
            setError(walletErrorToUserReadableMessage(error, t));
        } finally {
            setIsLoading(false);
        }
    }, [marketContract, saleID, price, saleCurrency, setIsLoading, callContract, refetchNFT, pendingTransactionModal.open, setPrice, setError, t]);

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
                {t('Change price')}
            </ActionButton>

            <UpdateSaleModal
                isOpen={updateSaleModal.isOpen}
                currentPrice={currentPrice}
                currency={currency}
                onClose={updateSaleModal.close}
                onConfirm={handleConfirmSale}
            />

            <LoadingModal
                isOpen={isLoading}
                text={t('Please confirm the transaction in your wallet to update the NFT price.')}
            />

            <ErrorMessageModal
                isOpen={!!error}
                error={error}
                onClose={() => setError(undefined)}
            />
        </>
    );
}