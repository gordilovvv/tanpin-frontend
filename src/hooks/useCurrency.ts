import { useMemo } from 'react';
import { Currency, CurrencyID, NativeCurrency, currencies, nativeCurrency } from '@/config/constants/currency';

export function useCurrency(id: CurrencyID): Currency {
    return useMemo(() => {
        const currency = currencies[id];

        if (!currency) {
            throw new Error(`Unknown currency ${id}`);
        }

        return currency;
    }, [id]);
}

export function useNativeCurrency(): NativeCurrency {
    return nativeCurrency;
}