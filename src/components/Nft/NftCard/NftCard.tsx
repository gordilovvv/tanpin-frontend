import { Image, ImageSkeleton, Stock } from '@/uikit';
import { NftDetails } from './NftDetails';
import { Link, useNavigate } from 'react-router-dom';
import { NFT } from '@/states/types';
import { useTranslation } from '@/localization';
import { isUniqueNFT } from '@/utils/nft';
import { formatTokenAmountShort } from '@/utils/formatTokenAmount';
import styles from './NftCard.module.scss';

type NftCardProps = {
    nft: NFT,
    userAddress?: `0x${string}`
}

export function NftCard({ nft, userAddress }: NftCardProps) {
    const { locale } = useTranslation();
    const isUnique = isUniqueNFT(nft);
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <Link
                to={`/${nft.contractAddress}/${nft.tokenID}`}
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

                    {!isUnique && <div className={styles.stock}>
                        <div className={styles.stockIcon}>
                            <Stock />
                        </div>

                        <div className={styles.stockCount}>
                            {formatTokenAmountShort(nft.totalSupply, locale)}
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

                                navigate(`/collection/${nft.collection.ID}`);
                            }}
                        >
                            {nft.collection.name}
                        </div>

                        <div className={styles.title}>{nft.name}</div>
                    </div>

                    <NftDetails
                        nft={nft}
                        unique={isUnique}
                        userAddress={userAddress}
                        buttonClass={styles.action}
                    />
                </div>
            </Link>
        </div>
    );
}