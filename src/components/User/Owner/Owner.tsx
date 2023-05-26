import { UserAvatar } from '..';
import styles from './Owner.module.scss';
import { ellipseAddress } from '@/utils/addressHelper';

type OwnerProps = {
    address: string
}

export function Owner({ address }: OwnerProps) {
    return (
        <div className={styles.wrapper}>
            <UserAvatar
                address={address}
                size='s'
            />

            <span className={styles.text}>
                {ellipseAddress(address)}
            </span>
        </div>
    );
}