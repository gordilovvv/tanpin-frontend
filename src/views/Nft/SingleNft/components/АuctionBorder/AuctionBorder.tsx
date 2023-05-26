import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './AuctionBorder.module.scss';

type AuctionBorderProps = {
    view?: 'primary' | 'danger' | 'default'
}

export function AuctionBorder({ children, view = 'default' }: PropsWithChildren<AuctionBorderProps>) {
    return (
        <div className={classNames(styles.wrapper, styles[view])}>
            {children}
        </div>
    );
}