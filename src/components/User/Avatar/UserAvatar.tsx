import { memo } from 'react';
import { UnstyleLink } from '@/uikit';
import { getAddressExplorerURL } from '@/utils/explorer';
import classNames from 'classnames';
import styles from './UserAvatar.module.scss';

const createGradient = (address: string) => {
    const seedArr = address.match(/.{1,7}/g)?.splice(0, 5);
    const colors: string[] = [];

    seedArr?.forEach((seed) => {
        let hash = 0;

        for (let i = 0; i < seed.length; i += 1) {
            hash = seed.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }

        const rgb = [0, 0, 0];

        for (let i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 255;
            rgb[i] = value;
        }

        colors.push(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    });

    return `linear-gradient(120deg, ${colors[0]}, ${colors[1]})`;
};

type UserAvatarProps = {
    as?: 'link',
    address: string,
    // s - 20px
    // m - 32px
    // l - 48px
    // xl - 72px
    size: 'xs' | 's' | 'm' | 'l' | 'xl'
}

export const UserAvatar = memo(({ as: Tag, address, size }: UserAvatarProps) => {
    const gradient = createGradient(address);

    if (Tag === 'link') {
        return (
            <UnstyleLink
                href={getAddressExplorerURL(address)}
                rel='noreferrer noopener'
                target='_blank'
                className={classNames(styles.avatar, styles[size])}
                style={{ background: gradient }}
            />
        );
    }

    return (
        <div
            className={classNames(styles.avatar, styles[size])}
            style={{ background: gradient }}
        />
    );
});

UserAvatar.displayName = 'UserAvatar';