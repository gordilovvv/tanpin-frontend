import { useState, useMemo, useEffect } from 'react';
import { NumericalInput } from '@/uikit';
import { useMinMaxValidation } from './hooks';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import styles from './PriceFilter.module.scss';

type PriceFilterProps = {
    min: string,
    max: string,
    onMinPriceChange: (value: string) => void
    onMaxPriceChange: (value: string) => void
}

export function PriceFilter({
    min: minFromState,
    max: maxFromState,
    onMinPriceChange,
    onMaxPriceChange,
}: PriceFilterProps) {
    const [min, setMin] = useState(minFromState);
    const [max, setMax] = useState(maxFromState);
    const isValid = useMinMaxValidation(min, max);

    const debouncedOnMinPriceChange = useMemo(() => {
        return debounce(onMinPriceChange, 400);
    }, [onMinPriceChange]);

    const debouncedOnMaxPriceChange = useMemo(() => {
        return debounce(onMaxPriceChange, 400);
    }, [onMaxPriceChange]);

    useEffect(() => {
        setMin(minFromState);
    }, [minFromState]);

    useEffect(() => {
        setMax(maxFromState);
    }, [maxFromState]);

    // Stop all callbacks on error
    useEffect(() => {
        if (!isValid) {
            debouncedOnMinPriceChange.cancel();
            debouncedOnMaxPriceChange.cancel();
        }
    }, [isValid]);

    useEffect(() => {
        if (isValid) {
            debouncedOnMinPriceChange(min);
        }
    }, [min, isValid, debouncedOnMinPriceChange]);

    useEffect(() => {
        if (isValid) {
            debouncedOnMaxPriceChange(max);
        }
    }, [max, isValid, debouncedOnMaxPriceChange]);

    return (
        <div className={styles.wrap}>
            <NumericalInput
                onInput={(value) => setMin(value)}
                value={min}
                placeholder='Min'
                className={styles.input}
            />

            <NumericalInput
                onInput={(value) => setMax(value)}
                value={max}
                placeholder='Max'
                className={classNames(styles.input, {
                    [styles.error]: !isValid
                })}
            />
        </div>
    );
}