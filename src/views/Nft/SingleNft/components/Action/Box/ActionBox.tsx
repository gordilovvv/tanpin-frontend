import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './ActionBox.module.scss';

type ActionBoxProps = {
    view?: 'primary' | 'danger' | 'default'
}

export function ActionBox({ view = 'default', children }: PropsWithChildren<ActionBoxProps>) {
    return (
        <div className={classNames(styles.box, styles[view])}>
            {children}
        </div>
    );
}