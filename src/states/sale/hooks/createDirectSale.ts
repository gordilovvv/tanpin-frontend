import { useMemo } from 'react';
import { useCreateDirectSaleStore } from '../store';
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
            amountError = 'Enter amount';
        }

        if (parsedValues.amount && parsedValues.amount.isLessThanOrEqualTo(0)) {
            amountError = 'Enter amount';
        }

        if (parsedValues.amount && parsedValues.amount.isGreaterThan(editionsAvailable)) {
            amountError = `Available for sale are ${editionsAvailable} copies`;
        }

        if (parsedValues.amount && !parsedValues.amount.isInteger()) {
            amountError = 'Enter whole number';
        }
    }

    if (!parsedValues.price) {
        priceError = 'Enter price';
    }

    if (parsedValues.price && parsedValues.price.isLessThan(0.01)) {
        priceError = 'Price is less than 0.01 USDT'; // TODO: dynamic currency
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