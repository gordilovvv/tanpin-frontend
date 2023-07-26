import { useState } from 'react';
import { NFT } from '@/states/types';
import styles from './TokenImage.module.scss';
import { Button, Image, Link, Spin } from '@/uikit';
import classNames from 'classnames';

type TokenImageProps = {
    image: NFT['imageURL']
    className?: string
}

export function TokenImage({ image, className }: TokenImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={classNames(styles.wrap, className)}>
            <div className={styles.content}>
                <Image
                    src={image}
                    alt=''
                    className={styles.image}
                    loading='lazy'
                    pending={<div className={styles.loader}>
                        <Spin size='s' />
                    </div>}
                    onFulfilled={() => setLoaded(true)}
                />

                {loaded && <Button
                    as='a'
                    href={image}
                    rel='noreferrer noopener'
                    target='_blank'
                    view="secondary"
                    className={styles.button}
                    iconSlot={<Link />}
                >
                    View original
                </Button>}
            </div>
        </div>
    );
}