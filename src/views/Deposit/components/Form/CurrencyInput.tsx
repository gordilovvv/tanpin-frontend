import { useState } from 'react';
import { NumericalInput } from '@/uikit';
import { CurrencySelect, CurrencySelectSkeleton } from './CurrencySelect';
import { InputCurrency, OutputCurrency } from '@/states/deposit/types';
import classNames from 'classnames';
import styles from './CurrencyInput.module.scss';

type CurrencyInputProps = {
    value: string,
    label: string,
    placeholder?: string,
    currency?: InputCurrency | OutputCurrency,
    currencies?: (InputCurrency | OutputCurrency)[],
    loading?: boolean,
    onType: (value: string) => void,
    onCurrencySelect: (currencyId: string) => void
}

export function CurrencyInput({ value, label, placeholder, currency, currencies, loading, onType, onCurrencySelect }: CurrencyInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            className={classNames(styles.input, {
                [styles.focused]: isFocused
            })}
        >
            <div className={styles.stack}>
                <div className={styles.label}>
                    {label}
                </div>

                <div className={styles.nativeInput}>
                    <NumericalInput
                        value={value}
                        placeholder={placeholder}
                        onInput={onType}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={styles.nativeInput}
                    />
                </div>
            </div>

            <div className={styles.right}>
                {loading || !currency || !currencies
                    ? <CurrencySelectSkeleton />
                    : <CurrencySelect
                        selectedCurrency={currency}
                        allCurrencies={currencies}
                        onSelect={onCurrencySelect}
                    />}
            </div>
        </div>
    );
}