import { HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';

export function Container({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    return (
        <div
            className={classNames(styles.container, className)}
            {...props}
        >
            {children}
        </div>
    );
}