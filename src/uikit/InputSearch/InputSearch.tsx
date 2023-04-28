import { useState, useEffect } from 'react';
import { Input } from '../Input/Input';
import { Search } from '..';
import { useDebounce } from './hooks';
import styles from './InputSearch.module.scss';

type InputProps = {
    value: string
    placeholder?: string
    onChange: (value: string) => void
}

export function InputSearch({ value, onChange, placeholder }: InputProps) {
    const [inputValue, setInputValue] = useState(value);

    const debounceTimeout = 300;
    const debouncedValue = useDebounce(
        inputValue,
        debounceTimeout
    );

    useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue]);

    return (<div
        className={styles.wrap}
    >
        <Input
            className={styles.input}
            type='text'
            value={inputValue}
            onInput={(event) => setInputValue(event.currentTarget.value)}
            placeholder={placeholder}
        />

        <div className={styles.icon}>
            {<Search />}
        </div>
    </div>);
}