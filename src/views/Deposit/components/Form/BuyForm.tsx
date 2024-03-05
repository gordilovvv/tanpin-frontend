import { useCallback, useMemo } from 'react';
import { Button, UnstyleLink } from '@/uikit';
import { ConnectWalletButton } from '@/components/Menus';
import { CurrencyInput } from './CurrencyInput';
import { MaticBonus } from '../MaticBonus/MaticBonus';
import { CurrencyRate, CurrencyRateSkeleton } from '../Rate/CurrencyRate';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useTranslation } from '@/localization';
import { useBuyTrade } from '@/states/deposit/hooks/useBuyTrade';
import { useBuyCallback } from '@/states/deposit/hooks/useBuyCallback';
import { useFetchPairRate } from '@/states/deposit/hooks/useFetchPairRate';
import { useCurrency, useCurrencyIdToCurrency } from '@/states/deposit/hooks/useCurrency';
import { Field, useDepositActions, useDepositState } from '@/states/deposit/store';
import { InputCurrency, MaticDistribution, OutputCurrency } from '@/states/deposit/types';
import { TELEGRAM_SUPPORT_URL } from '@/config';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './BuyForm.module.scss';

type BuyFormProps = {
    inputCurrencies?: InputCurrency[],
    outputCurrencies?: OutputCurrency[],
    maticDistribution?: MaticDistribution,
    configLoadFailed?: boolean
}

export function BuyForm({ inputCurrencies, outputCurrencies, maticDistribution, configLoadFailed }: BuyFormProps) {
    const { t } = useTranslation();
    const { address } = useAccount();
    const {
        typedValue,
        activeField,
        inputCurrency: inputCurrencyId,
        outputCurrency: outputCurrencyId
    } = useDepositState();

    const dependentField = activeField === Field.INPUT
        ? Field.OUTPUT
        : Field.INPUT;

    const inputCurrenciesMap = useCurrencyIdToCurrency(inputCurrencies);
    const outputCurrenciesMap = useCurrencyIdToCurrency(outputCurrencies);

    const inputCurrency = useCurrency(inputCurrencyId, inputCurrenciesMap);
    const outputCurrency = useCurrency(outputCurrencyId, outputCurrenciesMap);

    const pairRate = useFetchPairRate(inputCurrency?.id);
    const { inputAmount, outputAmount, inputError, maticBonus } = useBuyTrade(
        activeField,
        typedValue,
        pairRate,
        inputCurrency,
        maticDistribution
    );

    const parsedAmounts = useMemo(() => {
        return {
            [Field.INPUT]: activeField === Field.INPUT ? typedValue : inputAmount?.toString(),
            [Field.OUTPUT]: activeField === Field.OUTPUT ? typedValue : outputAmount?.toString(),
        };
    }, [typedValue, activeField, inputAmount, outputAmount]);

    const formattedAmounts = useMemo(() => {
        const dependentAmount = parsedAmounts[dependentField];

        return {
            [activeField]: typedValue,
            [dependentField]: dependentAmount ? formatTokenAmount(dependentAmount) : ''
        };
    }, [parsedAmounts, typedValue, activeField, dependentField]);

    const {
        typeValue,
        selectCurrency
    } = useDepositActions();

    const handleInputAmountType = useCallback((value: string) => {
        typeValue({
            value,
            field: Field.INPUT
        });
    }, [typeValue]);

    const handleOutputAmountType = useCallback((value: string) => {
        typeValue({
            value,
            field: Field.OUTPUT
        });
    }, [typeValue]);

    const handleInputCurrencySelect = useCallback((newCurrencyId: string) => {
        selectCurrency({
            currencyId: newCurrencyId,
            field: Field.INPUT
        });
    }, [selectCurrency]);

    const handleOutputCurrencySelect = useCallback((newCurrencyId: string) => {
        selectCurrency({
            currencyId: newCurrencyId,
            field: Field.OUTPUT
        });
    }, [selectCurrency]);

    const inputLoading = !inputCurrency;
    const outputLoading = !outputCurrency;

    const isBuyDisabled = !!inputError || inputLoading || outputLoading;
    const { isLoadingBuy, buyCallback } = useBuyCallback(
        parsedAmounts[Field.INPUT],
        inputCurrency,
        inputError
    );

    if (configLoadFailed) {
        return (
            <div className={styles.form}>
                <div className={styles.error}>
                    {t('Buy is temporarily unavailable.')}<br /> {t('Try again a bit later')}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.form}>
            <div className={styles.top}>
                <div className={styles.fields}>
                    <CurrencyInput
                        label={t('You’ll pay:')}
                        value={formattedAmounts[Field.INPUT]}
                        placeholder='0'
                        currency={inputCurrency}
                        currencies={inputCurrencies}
                        loading={inputLoading}
                        onType={handleInputAmountType}
                        onCurrencySelect={handleInputCurrencySelect}
                    />

                    <CurrencyInput
                        label={t('You’ll receive:')}
                        value={formattedAmounts[Field.OUTPUT]}
                        placeholder='0'
                        currency={outputCurrency}
                        currencies={outputCurrencies}
                        loading={outputLoading}
                        onType={handleOutputAmountType}
                        onCurrencySelect={handleOutputCurrencySelect}
                    />
                </div>

                {pairRate && inputCurrency
                    ? <CurrencyRate
                        rate={pairRate}
                        currency={inputCurrency}
                    />
                    : <CurrencyRateSkeleton />
                }
            </div>

            <div className={styles.bottom}>
                {address ?
                    <Button
                        view='primary'
                        loading={isLoadingBuy}
                        disabled={!!isBuyDisabled}
                        onClick={buyCallback}
                    >
                        {inputError ?? t('Continue')}
                    </Button>
                    : <ConnectWalletButton />}

                <MaticBonus amount={maticBonus} />
            </div>

            <div className={styles.support}>
                <div className={styles.supportText}>
                    {t('Got issues or need help? Our')} <UnstyleLink
                        href={TELEGRAM_SUPPORT_URL}
                        rel='noreferrer noopener'
                        target='_blank'
                    >{t('Support Team')}</UnstyleLink> {t('is ready to assist you at any moment')}
                </div>
            </div>
        </div>
    );
}