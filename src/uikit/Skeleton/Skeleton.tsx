import { HTMLAttributes } from 'react';
import styles from './Skeleton.module.scss';
import classNames from 'classnames';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div
        className={classNames(styles.skeleton, className)}
        {...props}
    />;
}