import { NFT } from '@/states/types';
import styles from './TokenImage.module.scss';
import { Button, Link } from '@/uikit';

type TokenImageProps = {
    image: NFT['imageURL']
}

export function TokenImage({ image }: TokenImageProps) {
    return (
        <div className={styles.wrap}>
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
    );
}