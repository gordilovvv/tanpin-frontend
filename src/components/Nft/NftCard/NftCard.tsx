import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardButton } from './Button/CardButton';
import { CardProperties } from './Properties/CardProperties';
import { NFT } from '@/states/types';
import { Collection } from '@/states/collection/types';
import styles from './NftCard.module.scss';

type NftCardProps = {
    nft: NFT
    collectionID: Collection['ID']
    collectionName: Collection['name']

}

export function NftCard({ nft, collectionID, collectionName }: NftCardProps) {
    const navigate = useNavigate();
    const handleAction = useCallback(() => {
        // TODO: logic
    }, [nft.status]);

    return (
        <div className={styles.card}>
            <Link
                to={`/collections/${collectionID}/${nft.ID}`}
                className={styles.cardLink}
            >
                <div className={styles.imageWrap}>
                    <img
                        className={styles.image}
                        src={nft.imageURL}
                        alt=''
                    />
                </div>

                <div className={styles.content}>
                    <div className={styles.head}>
                        <div
                            className={styles.collection}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();

                                navigate(`/collections/${collectionID}`);
                            }}
                        >
                            {collectionName}
                        </div>

                        <div className={styles.title}>{nft.name}</div>
                    </div>

                    <CardProperties
                        price={nft.price}
                        auction={nft.auction}
                        status={nft.status}
                    />

                    <CardButton
                        status={nft.status}
                        className={styles.action}
                        handleAction={handleAction}
                    />
                </div>
            </Link>
        </div>
    );
}