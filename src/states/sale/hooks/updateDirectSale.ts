import { useMemo } from 'react';
import { useTranslation } from '@/localization';
import { useUpdateDirectSaleStore } from '../store';
import { tryToParseAmount } from '@/utils/tryToParseAmount';
import { Currency } from '@/config/constants/currency';

export function useUpdateDirectSaleInfo(currentPrice: string, saleCurrency: Currency) {
    const { t } = useTranslation();
    const price = useUpdateDirectSaleStore(state => state.price);
    const parsedValue = useMemo(() => {
        return tryToParseAmount(price);
    }, [price]);

    let priceError: string | undefined;

    if (!parsedValue) {
        priceError = t('Enter amount');
    }

    if (parsedValue && parsedValue.isLessThan(0.01)) {
        priceError = t('Minimum is %amount%', { amount: `0.01 ${saleCurrency.symbol}` }); // TODO: dynamic currency
    }

    if (parsedValue && parsedValue.isEqualTo(currentPrice)) {
        priceError = t('This price is already set');
    }

    return {
        price,
        priceError
    };
}