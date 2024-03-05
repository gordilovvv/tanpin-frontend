import { useMemo } from 'react';
import { InputCurrency, OutputCurrency } from '../types';

type CurrencyIdToCurrency<T> = {
    [id: string]: T
}

export function useCurrency<T extends InputCurrency | OutputCurrency>(currencyId?: string, currencyIdToCurrency?: CurrencyIdToCurrency<T>) {
    return useMemo<T | undefined>(() => {
        if (!currencyIdToCurrency) {
            return;
        }

        // Get default currency
        if (!currencyId) {
            const ids = Object.keys(currencyIdToCurrency);

            return currencyIdToCurrency[ids[0]];
        }

        return currencyIdToCurrency[currencyId];
    }, [currencyId, currencyIdToCurrency]);
}

export function useCurrencyIdToCurrency<T extends InputCurrency | OutputCurrency>(currencies?: T[]) {
    return useMemo(() => {
        if (!currencies) {
            return;
        }

        const currencyIdToCurrency: {
            [id: string]: T
        } = {};

        for (const currency of currencies) {
            currencyIdToCurrency[currency.id] = currency;
        }

        return currencyIdToCurrency;
    }, [currencies]);
}