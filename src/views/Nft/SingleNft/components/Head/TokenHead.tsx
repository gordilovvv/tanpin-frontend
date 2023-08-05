import { Link } from 'react-router-dom';
import { CollectionLogo } from '@/components/Collections';
import { TokenStock } from './TokenStock';
import { isMultipleNFT } from '@/utils/nft';
import { NFT } from '@/states/types';
import styles from './TokenHead.module.scss';
import classNames from 'classnames';

type TokenHeadProps = {
    nft: NFT
    className?: string
}

export function TokenHead({ nft, className }: TokenHeadProps) {
    const isMultiple = isMultipleNFT(nft);

    return (
        <div className={classNames(styles.head, className)}>
            <div className={styles.collectionWrap}>
                <Link
                    to={`/${nft.collection.game.ID}/${nft.collection.ID}`}
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

            {isMultiple && <div className={styles.stock}>
                <TokenStock
                    supply={nft.supply}
                    available={nft.stock}
                />
            </div>}
        </div>
    );
}