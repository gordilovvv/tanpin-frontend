import { useState, useEffect, HTMLAttributes, forwardRef } from 'react';
import { Input } from '../Input/Input';
import { Search } from '..';
import { useDebounce } from '@/hooks/useDebounce';
import classNames from 'classnames';
import styles from './InputSearch.module.scss';

type InputProps = {
    value?: string
    placeholder?: string
    onChange: (value: string) => void
}

export const InputSearch = forwardRef<HTMLInputElement, InputProps & Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>>(
    ({ value = '', onChange, placeholder, className, ...props }, ref) => {
        const [inputValue, setInputValue] = useState(value);

        const debounceTimeout = 300;
        const debouncedValue = useDebounce(
            inputValue,
            debounceTimeout
        );

        useEffect(() => {
            onChange(debouncedValue);
        }, [debouncedValue]);

        // We want to update inputValue when value has been updates in parent
        useEffect(() => {
            if (value !== inputValue) {
                setInputValue(value);
            }
        }, [value]);

        return (
            <div
                className={classNames(styles.wrap, className)}
                {...props}
            >
                <Input
                    ref={ref}
                    className={styles.input}
                    type='text'
                    value={inputValue}
                    onInput={(event) => setInputValue(event.currentTarget.value)}
                    placeholder={placeholder}
                />

                <div className={styles.icon}>
                    {<Search />}
                </div>
            </div>
        );
    }
);

InputSearch.displayName = 'InputSearch';