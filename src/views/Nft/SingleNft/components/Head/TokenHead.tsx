import { Link } from 'react-router-dom';
import { CollectionLogo } from '@/components/Collections';
import { NFTInStore } from '@/states/nft/types';
import styles from './TokenHead.module.scss';
import classNames from 'classnames';

type TokenHeadProps = {
    nft: NFTInStore
    className?: string
}

export function TokenHead({ nft, className }: TokenHeadProps) {
    return (
        <div className={classNames(styles.head, className)}>
            <div className={styles.collectionWrap}>
                <Link
                    to={`/${nft.collection.game.logoURL}/${nft.collection.ID}`}
                    className={styles.collection}
                >
                    <CollectionLogo
                        image={nft.collection.logoURL}
                        size='xxs'
                    />

                    <div className={styles.collectionName}>
                        {nft.collection.name}
                    </div>
                </Link>
            </div>

            <div className={styles.title}>
                {nft.name}
            </div>
        </div>
    );
}