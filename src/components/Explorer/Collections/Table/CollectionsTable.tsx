import { ReactNode } from 'react';
import styles from './CollectionsTable.module.scss';

type CollectionsTableProps = {
    list: ReactNode
}

export function CollectionsTable({ list }: CollectionsTableProps) {
    const headColumns = [
        '#',
        'Collections',
        'Floor Price',
        'Items',
        'Sales',
        'Volume (7D)',
        // '1D Change',
    ];

    return (
        <div className={styles.table}>
            <div className={styles.head}>
                {headColumns.map((text, idx) => {
                    return (
                        <div
                            key={idx}
                            className={styles.headCol}
                        >
                            {text}
                        </div>
                    );
                })}
            </div>

            <div className={styles.body}>
                {list}
            </div>
        </div>
    );
}