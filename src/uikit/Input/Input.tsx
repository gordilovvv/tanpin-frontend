import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return <input
        className={classNames(styles.input, className)}
        {...props}
    />;
}