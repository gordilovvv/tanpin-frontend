import { UserAvatar } from '..';
import styles from './Owner.module.scss';
import { ellipseAddress } from '@/utils/addressHelper';
import { UserSizes } from '../Avatar/UserAvatar';
import classNames from 'classnames';

type OwnerProps = {
    address: string,
    size?: UserSizes
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