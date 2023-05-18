import { PropsWithChildren } from 'react';
import styles from './InfoItem.module.scss';

type InfoItemProps = {
    title: string
}

export function InfoItem({ children, title }: PropsWithChildren<InfoItemProps>) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>

            <div className={styles.body}>
                {children}

            </div>
        </div>
    );
}