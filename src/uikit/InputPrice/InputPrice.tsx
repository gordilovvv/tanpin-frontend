import styles from './InputPrice.module.scss';
import { useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';





type InputPriceProps = {
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
    initialMin?: string;
    initialMax?: string;
    isMobileLayout?: boolean;
}

export function InputPrice({
    onMinPriceChange,
    onMaxPriceChange,
    initialMin = '',
    initialMax = '',
}: InputPriceProps) {


    const [min, setMin] = useState(initialMin);
    const [max, setMax] = useState(initialMax);

    const [isValidMinMax, setIsValidMinMax] = useState({ min: false, max: false });

    const debouncedOnMaxPriceChange = useMemo(() => debounce(onMaxPriceChange, 300), [onMaxPriceChange]);
    const debouncedOnMinPriceChange = useMemo(() => debounce(onMinPriceChange, 300), [onMinPriceChange]);

    const handleMinValueChange = (value: string) => {
        const isValid = isValidMinNumber(value, max);
        const safeValue = String((value));

        setMin(safeValue);
        setIsValidMinMax({
            min: isValid,
            max: isValidMaxNumber(value, max),
        });

        if (!isValid) {
            debouncedOnMinPriceChange(safeValue || '0');
        }
    };

    const handleMaxValueChange = (value: string) => {
        const isValid = isValidMaxNumber(min, value);
        const safeValue = String((value));

        setMax(safeValue);
        setIsValidMinMax({
            min: isValidMinNumber(min, value),
            max: isValid,
        });

        if (!isValid) {
            debouncedOnMaxPriceChange(safeValue || '0');
        }
    };

    return (
        <div className={styles.inputWrapper}>
            <input
                onChange={(event) => handleMinValueChange(event.target.value)}
                value={min}
                type="number"
                placeholder="Min"
                className={classNames(styles.input, { [styles.error]: isValidMinMax.min })}
            />

            <input
                onChange={(event) => handleMaxValueChange(event.target.value)}
                value={max}
                type="number"
                placeholder="Max"
                className={classNames(styles.input, styles.inputLeft, { [styles.error]: isValidMinMax.max })}
            />
        </div>
    );
}

export const isValidMinNumber = (minStr: string, maxStr: string): boolean => {

    const min = parseInt(minStr, 10);
    const max = parseInt(maxStr, 10);

    if (min > max && min != 0) return true;

    return false;
};

export const isValidMaxNumber = (minStr: string, maxStr: string): boolean => {

    const min = parseInt(minStr, 10);
    const max = parseInt(maxStr, 10);

    if (min > max && max != 0) return true;

    return false;
};
