import { Link } from 'react-router-dom';
import { CollectionLogo } from '@/components/Collections';
import { TokenStock } from './TokenStock';
import { NFT } from '@/states/types';
import classNames from 'classnames';
import styles from './TokenHead.module.scss';

type TokenHeadProps = {
    nft: NFT
    unique: boolean,
    className?: string
}

export function TokenHead({ nft, unique, className }: TokenHeadProps) {
    return (
        <div className={classNames(styles.head, className)}>
            <div className={styles.collectionWrap}>
                <Link
                    to={`/collection/${nft.collection.ID}`}
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

            {!unique && <div className={styles.stock}>
                <TokenStock
                    supply={nft.maxSupply}
                    available={nft.stock}
                />
            </div>}
        </div>
    );
}