import { Button, Input } from '@/uikit';
import { NFTActionText } from '@/components/Nft';
import { useTokenMetadata } from '@/states/nft/hooks/useTokenMetadata';
import { useUpdateDirectSaleStore } from '@/states/sale/store';
import { useUpdateDirectSaleInfo } from '@/states/sale/hooks/updateDirectSale';
import styles from './UpdateSaleBody.module.scss';

type UpdateSaleBodyProps = {
    currentPrice: string,
    onConfirm: () => void
}

export function UpdateSaleBody({ currentPrice, onConfirm }: UpdateSaleBodyProps) {
    const tokenMetadata = useTokenMetadata();
    const { price, priceError } = useUpdateDirectSaleInfo(currentPrice);
    const setPrice = useUpdateDirectSaleStore(state => state.setPrice);

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
                disabled={!!priceError}
                onClick={onConfirm}
            >
                {priceError ?? 'Confirm'}
            </Button>
        </div>
    );
}