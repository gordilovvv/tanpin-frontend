import { ReactNode } from 'react';
import styles from './Property.module.scss';

type PropertyProps = {
    label: string,
    value: string | ReactNode
}

export function Property({ label, value }: PropertyProps) {
    return (
        <div className={styles.property}>
            <div className={styles.propertyLabel}>
                {label}
            </div>

            <div className={styles.propertyValue}>
                {value}
            </div>
        </div>
    );
}