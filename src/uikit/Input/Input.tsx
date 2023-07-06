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

type InputWithAddon = {
    addonText: string
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithAddon({ addonText, ...props }: InputWithAddon) {
    return (<div className={styles.wrap}>
        <Input
            {...props}
            className={styles.input}
        />

        <div className={styles.label}>
            {addonText}
        </div>
    </div>);
}