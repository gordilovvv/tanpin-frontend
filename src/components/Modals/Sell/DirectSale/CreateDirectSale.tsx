import { useEffect } from 'react';
import { Button, InputWithAddon } from '@/uikit';
import { useCreateDirectSaleInfo, useSaleActions } from '@/states/sale/hooks';
import styles from './CreateDirectSale.module.scss';

type CreateDirectSaleProps = {
    editionsAvailable?: number,
    onConfirm: () => void
}

export function CreateDirectSale({ editionsAvailable, onConfirm }: CreateDirectSaleProps) {
    const { onPriceChange, onAmountChange } = useSaleActions();
    const { amount, amountError, price, priceError, currency, parsedValues } = useCreateDirectSaleInfo(editionsAvailable);

    const amountInputError = parsedValues.amount && !!amountError;
    const priceInputError = parsedValues.price && !!priceError;

    const hasError = !!amountError || !!priceError || false;
    const buttonText = amountError || priceError || 'Confirm';

    useEffect(() => {
        if (!editionsAvailable) {
            onAmountChange('1');
        }
    }, [editionsAvailable, onAmountChange]);

    const handleConfirm = () => {
        if (hasError) {
            return;
        }

        onConfirm();
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.inputs}>
                {/* Only for multiple tokens */}
                {editionsAvailable && <InputWithAddon
                    numerical
                    value={amount}
                    onInput={onAmountChange}
                    placeholder='Enter amount'
                    addonText={`/ ${editionsAvailable}`}
                    error={amountInputError}
                    style={{ paddingRight: '120px' }}

                />}

                <InputWithAddon
                    numerical
                    value={price}
                    onInput={onPriceChange}
                    placeholder='Enter price'
                    addonText={currency.symbol}
                    error={priceInputError}
                    style={{ paddingRight: '80px' }}
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