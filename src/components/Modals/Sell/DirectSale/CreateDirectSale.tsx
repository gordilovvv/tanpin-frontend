import { Button, Input } from '@/uikit';
import { CopiesInput } from '@/components/Nft';
import { useTranslation } from '@/localization';
import { useCurrency } from '@/hooks/useCurrency';
import { useCreateDirectSaleInfo, useCreateDirectSaleActions, useCreateDirectSaleState } from '@/states/sale/hooks/createDirectSale';
import styles from './CreateDirectSale.module.scss';

type CreateDirectSaleProps = {
    availableAmount: number
    uniqueNFT: boolean
    onConfirm: () => void
}

export function CreateDirectSale({ availableAmount, uniqueNFT, onConfirm }: CreateDirectSaleProps) {
    const { t } = useTranslation();
    const { amount, price, currency } = useCreateDirectSaleState();
    const { onPriceChange, onAmountChange } = useCreateDirectSaleActions();

    const saleCurrency = useCurrency(currency);
    const { amountError, priceError, parsedValues } = useCreateDirectSaleInfo(
        amount,
        availableAmount,
        price,
        saleCurrency.symbol
    );

    const amountInputError = parsedValues.amount && !!amountError;
    const priceInputError = parsedValues.price && !!priceError;

    const hasError = !!amountError || !!priceError || false;
    const buttonText = amountError || priceError || t('Confirm');

    const handleConfirm = () => {
        if (hasError) {
            return;
        }

        onConfirm();
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.inputs}>
                {!uniqueNFT && <CopiesInput
                    value={amount}
                    maxValue={availableAmount}
                    danger={amountInputError}
                    onInput={onAmountChange}
                />}

                <Input
                    numerical
                    value={price}
                    onInput={onPriceChange}
                    placeholder={t('Enter price')}
                    rightAddon={saleCurrency.symbol}
                    danger={priceInputError}
                    style={{ paddingRight: '100px' }}
                />
            </div>

            <Button
                disabled={hasError}
                onClick={handleConfirm}
            >
                {buttonText}
            </Button>
        </div>
    );
}