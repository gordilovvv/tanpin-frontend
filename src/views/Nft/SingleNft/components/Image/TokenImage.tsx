import { NFT } from '@/states/types';
import styles from './TokenImage.module.scss';
import { Button, Image, ImageSkeleton, Link } from '@/uikit';
import classNames from 'classnames';

type TokenImageProps = {
    image: NFT['imageURL']
    className?: string
}

export function TokenImage({ image, className }: TokenImageProps) {
    return (
        <div className={classNames(styles.wrap, className)}>
            <div className={styles.content}>
                <Image
                    src={image}
                    alt=''
                    className={styles.image}
                    loading='lazy'
                    pending={<ImageSkeleton className={styles.imageSkeleton} />}
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