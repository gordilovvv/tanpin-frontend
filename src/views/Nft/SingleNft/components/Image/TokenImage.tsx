import { NFT } from '@/states/types';
import styles from './TokenImage.module.scss';
import { Button, Link } from '@/uikit';
import classNames from 'classnames';

type TokenImageProps = {
    image: NFT['imageURL']
    className?: string
}

export function TokenImage({ image, className }: TokenImageProps) {
    return (
        <div className={classNames(styles.wrap, className)}>
            <div className={styles.content}>
                <img
                    src={image}
                    alt=''
                    className={styles.image}
                />

                <Button
                    as='a'
                    href={image}
                    rel='noreferrer noopener'
                    target='_blank'
                    view="secondary"
                    className={styles.button}
                    iconSlot={<Link />}
                >
                    View original
                </Button>
            </div>
        </div>
    );
}