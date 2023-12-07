import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { Field } from '../store';
import { fiatCurrencies } from '@/config/constants/fiatCurrencies';
import { formatFiatCurrency } from '@/utils/fiat';
import { tryToParseAmount } from '@/utils/tryToParseAmount';
import { MaticDistribution, PaymentLimits } from '../types';

type TradeResult = {
    inputAmount: BigNumber,
    outputAmount: BigNumber
} | undefined;

function useTradeIn(
    inputAmount?: BigNumber,
    currencyRate?: string | null | undefined
): TradeResult {
    if (!inputAmount || !currencyRate) {
        return;
    }

    const outputAmount = inputAmount
        .dividedBy(currencyRate);

    return {
        inputAmount,
        outputAmount
    };
}

function useTradeOut(
    outputAmount?: BigNumber,
    currencyRate?: string | null | undefined
): TradeResult {
    if (!outputAmount || !currencyRate) {
        return;
    }

    const inputAmount = outputAmount.times(currencyRate);

    return {
        inputAmount,
        outputAmount
    };
}

export function useBuyTrade(
    activeField: Field,
    typedValue: string,
    currencyRate: string | null | undefined,
    paymentLimits: PaymentLimits | undefined,
    maticDistribution: MaticDistribution | undefined
) {
    const fiatCurrency = fiatCurrencies.rub;
    const parsedAmount = useMemo(() => {
        return tryToParseAmount(typedValue);
    }, [typedValue]);

    const tradeIn = useTradeIn(parsedAmount, currencyRate);
    const tradeOut = useTradeOut(parsedAmount, currencyRate);

    const exactTrade = activeField === Field.INPUT ? tradeIn : tradeOut;

    const maticBonus = useMemo(() => {
        if (!maticDistribution || !exactTrade) {
            return;
        }

        const outputAmount = new BigNumber(exactTrade.outputAmount);

        for (const distribution of maticDistribution) {
            if (outputAmount.gte(distribution.threshold)) {
                return distribution.amount;
            }
        }

        return '0';
    }, [exactTrade]);

    let inputError: string | undefined;

    if (!parsedAmount) {
        inputError = 'Enter RUB amount';
    }

    if (paymentLimits && exactTrade?.inputAmount.isLessThan(paymentLimits.min)) {
        inputError = `Minimum is ${formatFiatCurrency(paymentLimits.min, fiatCurrency.locale, fiatCurrency.code)}`;
    }

    if (paymentLimits && exactTrade?.inputAmount?.isGreaterThan(paymentLimits.max)) {
        inputError = `Maximum is ${formatFiatCurrency(paymentLimits.max, fiatCurrency.locale, fiatCurrency.code)}`;
    }

    return {
        inputError,
        inputAmount: exactTrade?.inputAmount,
        outputAmount: exactTrade?.outputAmount,
        maticBonus
    };
}