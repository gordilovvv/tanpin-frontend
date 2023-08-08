import { useMemo } from 'react';
import { useUpdateDirectSaleStore } from '../store';
import { tryToParseAmount } from '@/utils/tryToParseAmount';

export function useUpdateDirectSaleInfo(currentPrice: string) {
    const price = useUpdateDirectSaleStore(state => state.price);
    const parsedValue = useMemo(() => {
        return tryToParseAmount(price);
    }, [price]);

    let priceError: string | undefined;

    if (!parsedValue) {
        priceError = 'Enter amount';
    }

    if (parsedValue && parsedValue.isLessThan(0.01)) {
        priceError = 'Minimum is 0.01 USDT'; // TODO: dynamic currency
    }

    if (parsedValue && parsedValue.isEqualTo(currentPrice)) {
        priceError = 'This price is already set';
    }

    return {
        price,
        priceError
    };
}