import { PropsWithChildren } from 'react';
import styles from './FilterItem.module.scss';

type FilterItemProps = {
    title: string,
    addon?: string
}

export function FilterItem({ children, title, addon = '' }: PropsWithChildren<FilterItemProps>) {
    return (
        <div className={styles.item}>
            <div className={styles.head}>
                <div className={styles.title}>
                    {title}
                </div>

                {addon && <div className={styles.addon}>
                    {addon}
                </div>}
            </div>

            {children}
        </div>
    );
}