import { useCallback, useMemo } from 'react';
import { Button, Ruble, Tanpin, UnstyleLink } from '@/uikit';
import { ConnectWalletButton } from '@/components/Menus';
import { CurrencyInput } from './CurrencyInput';
import { MaticBonus } from '../MaticBonus/MaticBonus';
import { CurrencyRate, CurrencyRateSkeleton } from '../Rate/CurrencyRate';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useTranslation } from '@/localization';
import { useBuyTrade } from '@/states/deposit/hooks/useBuyTrade';
import { useBuyCallback } from '@/states/deposit/hooks/useBuyCallback';
import { Field, useDepositStore } from '@/states/deposit/store';
import { MaticDistribution, PaymentLimits } from '@/states/deposit/types';
import { useFetchPairRate } from '@/states/deposit/hooks/useFetchPairRate';
import { TELEGRAM_SUPPORT_URL } from '@/config';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './BuyForm.module.scss';

type BuyFormProps = {
    paymentLimits?: PaymentLimits,
    maticDistribution?: MaticDistribution,
    configLoadFailed?: boolean
}

export function BuyForm({ paymentLimits, maticDistribution, configLoadFailed }: BuyFormProps) {
    const { t } = useTranslation();
    const { address } = useAccount();
    const [typedValue, activeField, typeValue] = useDepositStore(state => [
        state.typedValue,
        state.activeField,
        state.typeValue
    ]);

    const dependentField = activeField === Field.INPUT
        ? Field.OUTPUT
        : Field.INPUT;

    const pairRate = useFetchPairRate();

    const { inputAmount, outputAmount, inputError, maticBonus } = useBuyTrade(
        activeField,
        typedValue,
        pairRate,
        paymentLimits,
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

    const handleAmountInType = useCallback((value: string) => {
        typeValue({
            value,
            field: Field.INPUT
        });
    }, [typeValue]);

    const handleAmountOutType = useCallback((value: string) => {
        typeValue({
            value,
            field: Field.OUTPUT
        });
    }, [typeValue]);

    const { isLoadingBuy, buyCallback } = useBuyCallback(
        parsedAmounts[Field.INPUT],
        inputError
    );

    if (configLoadFailed || pairRate === undefined) {
        return (
            <div className={styles.form}>
                <div className={styles.error}>
                    {t('Deposit is temporarily unavailable.')}<br /> {t('Try again a bit later')}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.form}>
            <div className={styles.top}>
                <div className={styles.fields}>
                    <CurrencyInput
                        value={formattedAmounts[Field.INPUT]}
                        placeholder='0'
                        currencyIcon={<Ruble />}
                        currencySymbol='RUB'
                        onType={handleAmountInType}
                    />

                    <CurrencyInput
                        value={formattedAmounts[Field.OUTPUT]}
                        placeholder='0'
                        currencyIcon={<Tanpin />}
                        currencySymbol='TANPIN'
                        onType={handleAmountOutType}
                    />
                </div>

                {pairRate
                    ? <CurrencyRate rate={pairRate} />
                    : <CurrencyRateSkeleton />
                }
            </div>

            <div className={styles.bottom}>
                {address ?
                    <Button
                        view='primary'
                        loading={isLoadingBuy}
                        disabled={!!inputError}
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