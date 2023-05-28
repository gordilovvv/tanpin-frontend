import stringToColor from 'string-to-color';
import styles from './UserAvatar.module.scss';
import classNames from 'classnames';

type UserAvatarProps = {
    address: string,
    size: 's' | 'm' | 'l'
}

const createGradient = (address: string) => {
    const degree = Math.min(parseInt(address.replace(/(^.+\D)(\d+)(\D.+$)/i, '$2').slice(0, 1)) * 10, 360);

    const firstColor = stringToColor(address.slice(2, 20));
    const secondColor = stringToColor(address.slice(-20));

    return `linear-gradient(${degree}deg, ${firstColor}, ${secondColor})`;
};

export function UserAvatar({ address, size }: UserAvatarProps) {
    const gradient = createGradient(address);

    return (
        <div
            className={classNames(styles.avatar, styles[size])}
            style={{ background: gradient }}
        />
    );
}