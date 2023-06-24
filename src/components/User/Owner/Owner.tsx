import { UserAvatar } from '..';
import { ellipseAddress } from '@/utils/addressHelper';
import classNames from 'classnames';
import styles from './Owner.module.scss';

type OwnerProps = {
    address: string
    size?: 's' | 'xl'
}

export function Owner({ address, size = 's' }: OwnerProps) {
    return (
        <div className={classNames(styles.wrapper, styles[size])}>
            <UserAvatar
                address={address}
                size={size}
            />

            <span className={classNames(styles.text, styles[size])}>
                {ellipseAddress(address)}
            </span>
        </div>
    );
}