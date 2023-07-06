import { HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './ActionBox.module.scss';

type ActionBoxProps = {
    view?: 'primary' | 'danger' | 'default'
} & HTMLAttributes<HTMLDivElement>

export function ActionBox({ view = 'default', children, className, ...props }: PropsWithChildren<ActionBoxProps>) {
    return (
        <div
            className={classNames(styles.box, className, styles[view])}
            {...props}
        >
            {children}
        </div>
    );
}