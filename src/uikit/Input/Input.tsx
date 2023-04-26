import { FC, useState } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';


type InputProps = {
    type?: string;
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode; // проп для передачи иконки через слот
}

Input.defaultProps = {
    type: 'text',
    placeholder: '',

};

export function Input({ value, icon, type, onChange, placeholder, className }: FC<InputProps>) {
    const [isFocused, setIsFocused] = useState<boolean>(false);

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
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
        />
    </div>);
}