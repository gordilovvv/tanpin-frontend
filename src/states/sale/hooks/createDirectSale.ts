import { useMemo } from 'react';
import { useTranslation } from '@/localization';
import { useCreateDirectSaleStore } from '../store';
import { editionsSuffix, pluralize } from '@/utils/pluralize';
import BigNumber from 'bignumber.js';

export function useCreateDirectSaleActions() {
    const [setPrice, setAmount] = useCreateDirectSaleStore(state => [
        state.setPrice,
        state.setAmount
    ]);

    return {
        onPriceChange: setPrice,
        onAmountChange: setAmount
    };
}

export function useCreateDirectSaleInfo(editionsAvailable?: number) {
    const { t, locale } = useTranslation();
    const [amount, price, currency] = useCreateDirectSaleStore(state => [
        state.amount,
        state.price,
        state.currency
    ]);

    const parsedValues = useMemo(() => {
        return {
            amount: amount ? new BigNumber(amount) : undefined,
            price: price ? new BigNumber(price) : undefined
        };
    }, [amount, price]);

    let priceError: string | undefined;
    let amountError: string | undefined;

    if (editionsAvailable) {
        if (!parsedValues.amount) {
            amountError = t('Enter amount');
        }

        if (parsedValues.amount && parsedValues.amount.isLessThanOrEqualTo(0)) {
            amountError = t('Enter amount');
        }

        if (parsedValues.amount && parsedValues.amount.isGreaterThan(editionsAvailable)) {
            amountError = t('Available for sale are %amount%', {
                amount: `${editionsAvailable} ${pluralize(editionsAvailable, locale, editionsSuffix)}`
            });
        }

        if (parsedValues.amount && !parsedValues.amount.isInteger()) {
            amountError = t('Enter whole number');
        }
    }

    if (!parsedValues.price) {
        priceError = t('Enter price');
    }

    if (parsedValues.price && parsedValues.price.isLessThan(0.01)) {
        priceError = t('Price is less than %num% %currency%', {
            num: 0.01,
            currency: 'USDT'
        });
    }

    return {
        amount,
        price,
        currency,
        priceError,
        amountError,
        parsedValues
    };
}