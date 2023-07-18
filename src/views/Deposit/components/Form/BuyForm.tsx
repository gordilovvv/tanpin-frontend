import { useCallback, useMemo } from 'react';
import { Button, Input, Ruble, Tether, UnstyleLink } from '@/uikit';
import { ConnectWalletButton } from '@/components/Menus';
import { MaticBonus } from '../MaticBonus/MaticBonus';
import { CurrencyRate, CurrencyRateSkeleton } from '../Rate/CurrencyRate';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useBuyTrade } from '@/states/deposit/hooks/useBuyTrade';
import { useBuyCallback } from '@/states/deposit/hooks/useBuyCallback';
import { Field, useDepositStore } from '@/states/deposit/store';
import { useExchangeConfig } from '@/states/deposit/hooks/useExchangeConfig';
import { useFetchPairRate } from '@/states/deposit/hooks/useFetchPairRate';
import { TERMS_URL } from '@/config';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './BuyForm.module.scss';

export function BuyForm() {
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
    const { paymentLimits, maticDistribution, error } = useExchangeConfig();

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

    if (error || pairRate === undefined) {
        return (
            <div className={styles.form}>
                <div className={styles.error}>
                    Deposit is temporarily unavailable.<br /> Try again a bit later
                </div>
            </div>
        );
    }

    return (
        <div className={styles.form}>
            <div className={styles.fields}>
                <Input
                    numerical
                    value={formattedAmounts[Field.INPUT]}
                    placeholder="Enter amount in RUB"
                    leftAddon={<Ruble />}
                    onInput={handleAmountInType}
                    style={{ paddingLeft: '48px' }}
                />

                <Input
                    numerical
                    value={formattedAmounts[Field.OUTPUT]}
                    placeholder="Enter amount in USDT"
                    leftAddon={<Tether />}
                    onInput={handleAmountOutType}
                    style={{ paddingLeft: '48px' }}
                />

                <MaticBonus amount={maticBonus} />
            </div>

            <div className={styles.bottom}>
                {pairRate
                    ? <CurrencyRate rate={pairRate} />
                    : <CurrencyRateSkeleton />
                }

                <div className={styles.button}>
                    {address ?
                        <Button
                            view='primary'
                            loading={isLoadingBuy}
                            disabled={!!inputError}
                            onClick={buyCallback}
                        >
                            {inputError ?? 'Continue'}
                        </Button>
                        : <ConnectWalletButton />}

                    <div className={styles.terms}>
                        By proceeding you agree with our <UnstyleLink
                            href={TERMS_URL}
                            rel='noreferrer noopener'
                            target='_blank'
                        >Terms</UnstyleLink>
                    </div>
                </div>
            </div>
        </div>
    );
}