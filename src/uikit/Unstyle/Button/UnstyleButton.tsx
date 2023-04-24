import { HTMLAttributes, PropsWithChildren, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './UnstyleButton.module.scss';

export const UnstyleButton = forwardRef<HTMLButtonElement, PropsWithChildren<HTMLAttributes<HTMLButtonElement>>>(
    ({ className, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={classNames(styles.button, className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);

UnstyleButton.displayName = 'UnstyleButton';