import { PropsWithChildren } from 'react';
import styles from './TransactionDetail.module.scss';

type TransactionDetailProps = {
    label: string
}

export function TransactionDetail({ label, children }: PropsWithChildren<TransactionDetailProps>) {
    return (
        <div className={styles.detail}>
            <div className={styles.label}>
                {label}
            </div>

            <div className={styles.value}>
                {children}
            </div>
        </div>
    );
}