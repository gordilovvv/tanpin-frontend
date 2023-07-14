import { Image, ImageSkeleton, Stock } from '@/uikit';
import { NftSingle } from './NftSingle';
import { NftMultiple } from './NftMultiple';
import { Link, useNavigate } from 'react-router-dom';
import { isSingleNFT } from '@/utils/nft';
import { formatTokenAmountShort } from '@/utils/formatTokenAmount';
import { NFT } from '@/states/types';
import { Address } from 'viem';
import styles from './NftCard.module.scss';

type NftCardProps = {
    nft: NFT,
    userAddress?: Address
}

export function NftCard({ nft, userAddress }: NftCardProps) {
    const isSingle = isSingleNFT(nft);
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <Link
                to={`/${nft.collection.game.ID}/${nft.collection.ID}/${nft.ID}`}
                className={styles.cardLink}
            >
                <div className={styles.imageWrap}>
                    <Image
                        className={styles.image}
                        src={nft.imageURL}
                        alt=''
                        loading='lazy'
                        pending={<ImageSkeleton className={styles.imageSkeleton} />}
                    />

                    {!isSingle && <div className={styles.stock}>
                        <div className={styles.stockIcon}>
                            <Stock />
                        </div>

                        <div className={styles.stockCount}>
                            {formatTokenAmountShort(nft.supply)}
                        </div>
                    </div>}
                </div>

                <div className={styles.content}>
                    <div className={styles.head}>
                        <div
                            className={styles.collection}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();

                                navigate(`/${nft.collection.game.ID}/${nft.collection.ID}`);
                            }}
                        >
                            {nft.collection.name}
                        </div>

                        <div className={styles.title}>{nft.name}</div>
                    </div>

                    {isSingle
                        ? <NftSingle
                            nft={nft}
                            userAddress={userAddress}
                            buttonClass={styles.action}
                        />
                        : <NftMultiple
                            nft={nft}
                            userAddress={userAddress}
                            buttonClass={styles.action}
                        />}
                </div>
            </Link>
        </div>
    );
}