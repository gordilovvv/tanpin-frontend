import { PropsWithChildren } from 'react';
import styles from './ActionTitle.module.scss';

export function ActionTitle({ children }: PropsWithChildren) {
    return (
        <div className={styles.title}>
            {children}
        </div>
    );
}