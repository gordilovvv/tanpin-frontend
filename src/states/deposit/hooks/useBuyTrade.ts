import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { Field } from '../store';
import { useTranslation } from '@/localization';
import { formatFiatCurrency } from '@/utils/fiat';
import { tryToParseAmount } from '@/utils/tryToParseAmount';
import { isTokenCurrency } from '@/views/Deposit/utils/isToken';
import { formatTokenAmountV2 } from '@/utils/formatTokenAmount';
import { InputCurrency, MaticDistribution } from '../types';

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
    inputCurrency: InputCurrency | undefined,
    maticDistribution: MaticDistribution | undefined
) {
    const { t, locale } = useTranslation();
    const parsedAmount = useMemo(() => {
        return tryToParseAmount(typedValue);
    }, [typedValue]);

    const tradeIn = useTradeIn(parsedAmount, currencyRate);
    const tradeOut = useTradeOut(parsedAmount, currencyRate);

    const exactTrade = activeField === Field.INPUT
        ? tradeIn
        : tradeOut;

    const isCurrencyToken = !!inputCurrency && isTokenCurrency(inputCurrency);
    const maticBonus = useMemo(() => {
        if (!maticDistribution || !exactTrade) {
            return;
        }

        const inputAmount = new BigNumber(exactTrade.inputAmount);

        for (const distribution of maticDistribution) {
            if (inputAmount.gte(distribution.threshold)) {
                return distribution.amount;
            }
        }

        return '0';
    }, [exactTrade]);

    let inputError: string | undefined;

    if (!parsedAmount) {
        inputError = t('Enter %currency% amount', { currency: inputCurrency?.symbol });
    }

    if (inputCurrency?.limits && exactTrade?.inputAmount.isLessThan(inputCurrency.limits.min)) {
        const amount = isCurrencyToken
            ? formatTokenAmountV2(inputCurrency.limits.min, locale, inputCurrency.symbol)
            : formatFiatCurrency(inputCurrency.limits.min, locale, inputCurrency.id);

        inputError = t('Minimum is %amount%', { amount });
    }

    if (inputCurrency?.limits && exactTrade?.inputAmount?.isGreaterThan(inputCurrency.limits.max)) {
        const amount = isCurrencyToken
            ? formatTokenAmountV2(inputCurrency.limits.max, locale, inputCurrency.symbol)
            : formatFiatCurrency(inputCurrency.limits.max, locale, inputCurrency.id);

        inputError = t('Maximum is %amount%', { amount });
    }

    return {
        inputError,
        inputAmount: exactTrade?.inputAmount,
        outputAmount: exactTrade?.outputAmount,
        maticBonus
    };
}