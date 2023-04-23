import { HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './Title.module.scss';

export function Title({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    return (
        <div
            className={classNames(styles.title, className)}
            {...props}
        >
            {children}
        </div>
    );
}