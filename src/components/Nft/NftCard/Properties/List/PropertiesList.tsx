import { PropsWithChildren } from 'react';
import styles from './PropertiesList.module.scss';

export function PropertiesList({ children }: PropsWithChildren<unknown>) {
    return (
        <div className={styles.list}>
            {children}
        </div>
    );
}