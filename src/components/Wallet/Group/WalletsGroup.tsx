import { PropsWithChildren } from 'react';
import styles from './WalletsGroup.module.scss';

type WalletsGroupProps = {
    label: string
}

export function WalletsGroup({ label, children }: PropsWithChildren<WalletsGroupProps>) {
    return (
        <div className={styles.group}>
            <div className={styles.label}>
                {label}
            </div>

            <div className={styles.list}>
                {children}
            </div>
        </div>
    );
}