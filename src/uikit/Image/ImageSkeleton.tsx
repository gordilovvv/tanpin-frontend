import { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './ImageSkeleton.module.scss';

type ImageSkeletonProps = {
    className?: string,
    style?: CSSProperties
}

export function ImageSkeleton({ className, style }: ImageSkeletonProps) {
    return (<div
        className={classNames(styles.skeleton, className)}
        style={style}
    ></div>);
}