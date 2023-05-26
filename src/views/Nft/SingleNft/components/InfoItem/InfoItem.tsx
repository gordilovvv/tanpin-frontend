import { PropsWithChildren, HTMLAttributes } from 'react';
import styles from './InfoItem.module.scss';
import classNames from 'classnames';

type InfoItemProps = {
    title: string
}

export function InfoItem({ children, title, className }: PropsWithChildren<InfoItemProps> & PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    return (
        <div className={classNames(styles.wrapper, className)}>
            <div className={styles.title}>{title}</div>

            <div className={styles.body}>
                {children}

            </div>
        </div>
    );
}