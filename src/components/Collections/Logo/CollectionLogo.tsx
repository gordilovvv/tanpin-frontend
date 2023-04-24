import { HTMLAttributes } from 'react';
import styles from './CollectionLogo.module.scss';
import classNames from 'classnames';

type CollectionLogoProps = {
    image: string
}

export function CollectionLogo({ image, className, ...props }: CollectionLogoProps & HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={classNames(styles.logo, className)}
            {...props}
        >
            <img
                src={image}
                className={styles.image}
            />
        </div>
    );
}