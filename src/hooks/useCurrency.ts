import { useMemo } from 'react';
import { Currency, currencies } from '@/config/constants/currency';

export function useCurrency(id: string): Currency {
    return useMemo(() => {
        const currency = currencies[id];

        if (!currency) {
            throw new Error(`Unknown currency ${id}`);
        }

        return currency;
    }, [id]);
}