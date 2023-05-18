import { PropsWithChildren } from 'react';
import styles from './BidStatus.module.scss';
import classNames from 'classnames';

type BidStatusProps = {
    title: string,
    view?: 'primary' | 'error'
}

export function BidStatus({ title, children, view = 'primary' }: PropsWithChildren<BidStatusProps>) {
    return (
        <div className={classNames(styles.wrapper, styles[view])}>
            <div className={styles.title}>
                {title}
            </div>

            {children}
        </div>
    );
}
