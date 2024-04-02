import { useState } from 'react';
import { Image, Spin } from '@/uikit';
import { RefreshMetadataButton } from './RefreshMetadataButton';
import classNames from 'classnames';
import styles from './TokenImage.module.scss';

type TokenImageProps = {
    contractAddress: `0x${string}`,
    tokenID: string,
    image: string
    className?: string
}

export function TokenImage({ contractAddress, tokenID, image, className }: TokenImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={classNames(styles.wrap, className)}>
            <div className={styles.content}>
                <div
                    className={styles.blur}
                    style={{ backgroundImage: `url(${image})` }}
                ></div>

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
            </div>

            {loaded && <div className={styles.buttons}>
                <RefreshMetadataButton
                    contractAddress={contractAddress}
                    tokenID={tokenID}
                />
            </div>}
        </div>
    );
}