import { PropsWithChildren } from 'react';
import styles from './DetailRow.module.scss';

type DetailRowProps = {
    title: string
}

export function DetailRow({ title, children }: PropsWithChildren<DetailRowProps>) {
    return (
        <div className={styles.row}>
            <div className={styles.title}>
                {title}
            </div>

            <div className={styles.value}>
                {children}
            </div>
        </div>
    );
}