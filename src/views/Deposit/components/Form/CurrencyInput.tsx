import { ReactNode, useState } from 'react';
import { NumericalInput } from '@/uikit';
import classNames from 'classnames';
import styles from './CurrencyInput.module.scss';

type CurrencyInputProps = {
    value: string,
    placeholder?: string,
    currencySymbol: string,
    currencyIcon: ReactNode,
    onType: (value: string) => void
}

export function CurrencyInput({ value, placeholder, currencyIcon, currencySymbol, onType }: CurrencyInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            className={classNames(styles.input, {
                [styles.focused]: isFocused
            })}
        >
            <div className={styles.stack}>
                <div className={styles.currency}>
                    {currencySymbol}
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

            <div className={styles.icon}>
                {currencyIcon}
            </div>
        </div>
    );
}