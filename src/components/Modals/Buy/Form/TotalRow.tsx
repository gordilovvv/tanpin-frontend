import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './TotalRow.module.scss';

type TotalRowProps = {
    label: string
    className?: string
}

export function TotalRow({ label, children, className }: PropsWithChildren<TotalRowProps>) {
    return (
        <div className={classNames(styles.row, className)}>
            <div className={styles.label}>
                {label}:
            </div>

            <div className={styles.value}>
                {children}
            </div>
        </div>
    );
}