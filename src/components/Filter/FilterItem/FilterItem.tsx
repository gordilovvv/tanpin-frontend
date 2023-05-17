import { PropsWithChildren } from 'react';
import styles from './FilterItem.module.scss';

type FilterItemProps = {
    title: string,
    currency?: string
}

export function FilterItem({ children, title, currency = '' }: PropsWithChildren<FilterItemProps>) {
    return (
        <div className={styles.item}>
            <div className={styles.header}>
                <div className={styles.title}> {title}</div>
                {currency && <div className={styles.currency}> {currency}</div>}
            </div>

            {children}
        </div>
    );
}