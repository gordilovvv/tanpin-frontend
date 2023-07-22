import { useState } from 'react';
import { Button, Input } from '@/uikit';
import { NFTActionText } from '@/components/Nft';
import { LoadingContent } from '../../Loading/LoadingContent';
import { useTokenMetadata } from '@/states/nft/hooks/useTokenMetadata';
import { useContractCall, useMarketContract } from '@/hooks/useContract';
import { usePendingTransactionModal } from '@/states/global/hooks';
import { formatValueToRaw } from '@/utils/formatRawAmount';
import { logError } from '@/utils/sentry';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';
import { CONTRACTS } from '@/config/constants/contracts';
import { activeChainId } from '@/config/chain';
import styles from './UpdateSaleBody.module.scss';

type UpdateSaleBodyProps = {
    saleID: string
    onError?: (error: string) => void
    onSuccess?: () => void
}

// TODO:
// 1. Должна открыться отдельная модалка загрузки при отправке транзы
// 2. Dynamic currency
export function UpdateSaleBody({ saleID, onError, onSuccess }: UpdateSaleBodyProps) {
    const { callContract } = useContractCall();
    const marketContract = useMarketContract();
    const tokenMetadata = useTokenMetadata();
    const pendingTransactionModal = usePendingTransactionModal();
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isButtonDisabled = price.length === 0;

    const handleUpdateSale = async () => {
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

            // TODO: ПОСЛЕ ТРАНЗАКЦИИ ОБНОВИТЬ NFT
            pendingTransactionModal.open({
                hash,
                text: 'The NFT price is successfully changed. Updates will appear as soon as transaction is confirmed.'
            });

            onSuccess?.();
        } catch (error) {
            logError(error);
            onError?.(walletErrorToUserReadableMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (<LoadingContent text='Please confirm the transaction in your wallet to update the NFT price.' />);
    }

    return (
        <div className={styles.wrap}>
            {tokenMetadata && <NFTActionText
                text='You are going to update the price for'
                nftName={tokenMetadata.name}
                collectionID={tokenMetadata.collection.ID}
                collectionName={tokenMetadata.collection.name}
                gameID={tokenMetadata.collection.game.ID}
            />}

            <Input
                value={price}
                numerical
                onInput={setPrice}
                rightAddon='USDT'
                style={{ paddingRight: '72px' }}
            />

            <Button
                disabled={isButtonDisabled}
                onClick={handleUpdateSale}
            >
                Confirm
            </Button>
        </div>
    );
}