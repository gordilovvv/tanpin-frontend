import { UserAvatar } from '..';
import { Link, UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { getAddressExplorerURL } from '@/utils/explorer';
import styles from './Owner.module.scss';
import classNames from 'classnames';

type OwnerProps = {
    address: string
    size: 'xs' | 's' | 'xl',
    isUser?: boolean
    showLink?: boolean
}

export function Owner({ address, size, isUser, showLink }: OwnerProps) {
    return (
        <UnstyleLink
            href={getAddressExplorerURL(address)}
            rel='noreferrer noopener'
            target='_blank'
        >
            <div className={classNames(styles.wrapper, styles[size])}>
                <UserAvatar
                    address={address}
                    size={size}
                />

                <span className={styles.text}>
                    {isUser ? 'You' : ellipseAddress(address)}
                </span>

                {showLink && <div className={styles.icon}>
                    <Link className={styles.icon} />
                </div>}
            </div>
        </UnstyleLink>
    );
}