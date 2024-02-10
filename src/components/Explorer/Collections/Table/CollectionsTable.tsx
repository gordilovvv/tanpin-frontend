import { ReactNode } from 'react';
import { useTranslation } from '@/localization';
import styles from './CollectionsTable.module.scss';

type CollectionsTableProps = {
    list: ReactNode
}

export function CollectionsTable({ list }: CollectionsTableProps) {
    const { t } = useTranslation();
    const headColumns = [
        '#',
        t('Collections'),
        t('Floor Price'),
        t('Items'),
        t('Sales'),
        t('Volume (%days%D)', { days: 7 }),
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