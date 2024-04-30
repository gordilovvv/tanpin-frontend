import { useState, useEffect, HTMLAttributes, forwardRef } from 'react';
import { Input, Search } from '@/uikit';
import { useDebounce } from '@/hooks/useDebounce';
import classNames from 'classnames';
import styles from './SearchInput.module.scss';

type SearchInputProps = {
    value?: string
    placeholder?: string
    onChange: (value: string) => void
} & Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;

// Доработать
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ value = '', onChange, placeholder, className, ...props }, ref) => {
        const [inputValue, setInputValue] = useState(value);

        const debounceTimeout = 500;
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
                    type='text'
                    className={styles.input}
                    value={inputValue}
                    onInput={setInputValue}
                    placeholder={placeholder}
                />

                <div className={styles.icon}>
                    {<Search />}
                </div>
            </div>
        );
    }
);

SearchInput.displayName = 'InputSearch';