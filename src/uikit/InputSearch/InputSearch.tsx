import { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './InputSearch.module.scss';
import classNames from 'classnames';




type InputProps = {
    type?: string;
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
    icon?: React.ReactElement; // проп для передачи иконки через слот
    timeout?: number,
}




export function InputSearch({ value, icon, type, onChange, placeholder, className, timeout = 300 }: InputProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const {
        debouncedValue,
        handleOnChange,
    } = useDebouncedOnChange(onChange, value, timeout);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };



    return (<div
        className={classNames(styles.wrapper, className, {
            [styles.focused]: isFocused,
            [styles.hasIcon]: icon,
        })}
    >

        {(icon) && <span className={styles.icon}>{icon}</span>}

        <input
            className={styles.input}
            type={type}
            value={debouncedValue}
            onChange={handleOnChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
        />
    </div>);
}


const debounce = (fn, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};


const useDebouncedOnChange = (setter, value, timeout) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        setDebouncedValue(value);
    }, [value]);

    const debouncedOnChange = useMemo(
        () =>
            debounce((e) => {
                setter(e);
            }, timeout),
        [setter]
    );

    const handleOnChange = useCallback(
        (e) => {
            setDebouncedValue(e.target.value);
            debouncedOnChange(e);
        },
        [debouncedOnChange]
    );

    return {
        debouncedValue,
        handleOnChange,
    };
};
