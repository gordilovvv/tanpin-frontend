import { useEffect } from 'react';
import { Button, Input } from '@/uikit';
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
                {editionsAvailable && <Input
                    numerical
                    value={amount}
                    onInput={onAmountChange}
                    placeholder='Enter amount'
                    rightAddon={`/ ${editionsAvailable}`}
                    danger={amountInputError}
                    style={{ paddingRight: '120px' }}

                />}

                <Input
                    numerical
                    value={price}
                    onInput={onPriceChange}
                    placeholder='Enter price'
                    rightAddon={currency.symbol}
                    danger={priceInputError}
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