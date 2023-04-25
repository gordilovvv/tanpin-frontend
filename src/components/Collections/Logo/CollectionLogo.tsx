import { HTMLAttributes } from 'react';
import styles from './CollectionLogo.module.scss';
import classNames from 'classnames';

type CollectionLogoProps = {
    image: string,
    // (Desktop)
    // XS - 42px
    // S - 48px
    // M - 80px
    size: 'xs' | 's' | 'm'
}

export function CollectionLogo({ image, size, className, ...props }: CollectionLogoProps & HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={classNames(styles.logo, styles[size], className)}
            {...props}
        >
            <img
                src={image}
                className={styles.image}
            />
        </div>
    );
}