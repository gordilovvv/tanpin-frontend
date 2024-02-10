import { useState } from 'react';
import { NFT } from '@/states/types';
import { Image, Spin } from '@/uikit';
import { RefreshMetadataButton } from './RefreshMetadataButton';
import classNames from 'classnames';
import styles from './TokenImage.module.scss';

type TokenImageProps = {
    nftID: string,
    image: NFT['imageURL']
    className?: string
}

export function TokenImage({ nftID, image, className }: TokenImageProps) {
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

                {loaded && <div className={styles.buttons}>
                    {/* <Button
                        as='a'
                        href={image}
                        rel='noreferrer noopener'
                        target='_blank'
                        view="secondary"
                        className={styles.button}
                        iconSlot={<Link />}
                    >
                        View original
                    </Button> */}

                    <RefreshMetadataButton nftID={nftID} />
                </div>}
            </div>
        </div>
    );
}