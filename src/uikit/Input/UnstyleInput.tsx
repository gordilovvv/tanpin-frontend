import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './UnstyleInput.module.scss';
import classNames from 'classnames';

type UnstyleInputProps = InputHTMLAttributes<HTMLInputElement>;

export const UnstyleInput = forwardRef<HTMLInputElement, UnstyleInputProps>(
    ({ className, ...props }, ref) => {
        return <input
            ref={ref}
            className={classNames(styles.input, className)}
            {...props}
        />;
    }
);

UnstyleInput.displayName = 'UnstyleInput';