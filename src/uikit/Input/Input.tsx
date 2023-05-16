import { InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return <input
            ref={ref}
            className={classNames(styles.input, className)}
            {...props}
        />;
    }
);

Input.displayName = 'Input';