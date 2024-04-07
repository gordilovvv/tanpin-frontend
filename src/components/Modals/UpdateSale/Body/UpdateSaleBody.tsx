import { Button, Input } from '@/uikit';
import { NFTPreview } from '@/components/Nft';
import { useTranslation } from '@/localization';
import { useNFT } from '@/states/nft/hooks/useNFT';
import { useCurrency } from '@/hooks/useCurrency';
import { useUpdateDirectSaleStore } from '@/states/sale/store';
import { useUpdateDirectSaleInfo } from '@/states/sale/hooks/updateDirectSale';
import styles from './UpdateSaleBody.module.scss';

type UpdateSaleBodyProps = {
    currentPrice: string,
    currency: string,
    onConfirm: () => void,
    onClose?: () => void
}

export function UpdateSaleBody({ currentPrice, currency, onConfirm, onClose }: UpdateSaleBodyProps) {
    const { t } = useTranslation();
    const nft = useNFT()!;
    const saleCurrency = useCurrency(currency);

    const { price, priceError } = useUpdateDirectSaleInfo(
        currentPrice,
        saleCurrency
    );

    const setPrice = useUpdateDirectSaleStore(state => state.setPrice);

    return (
        <div className={styles.wrap}>
            <NFTPreview
                nft={nft}
                onClick={onClose}
            />

            <Input
                value={price}
                numerical
                onInput={setPrice}
                rightAddon={saleCurrency.symbol}
                style={{ paddingRight: '100px' }}
            />

            <Button
                disabled={!!priceError}
                onClick={onConfirm}
            >
                {priceError ?? t('Confirm')}
            </Button>
        </div>
    );
}