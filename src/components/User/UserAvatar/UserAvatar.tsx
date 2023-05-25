import { HTMLAttributes } from 'react';
import styles from './UserAvatar.module.scss';
import classNames from 'classnames';

type UserAvatarProps = {
    // (Desktop)
    // M - 48
    // S - 32
    size: 's' | 'm';
}

export function UserAvatar({ size, ...props }: UserAvatarProps & HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={classNames(styles.avatar, styles[size])}
            {...props}
        />
    );
}