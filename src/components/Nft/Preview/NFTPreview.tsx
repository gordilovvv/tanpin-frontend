import { NFT } from '@/states/types';
import classNames from 'classnames';
import styles from './NFTPreview.module.scss';

type NFTPreviewProps = {
    nft: NFT,
    onClick?: () => void
}

export function NFTPreview({ nft, onClick }: NFTPreviewProps) {
    return (
        <div
            className={classNames(styles.wrap, {
                [styles.clickable]: !!onClick
            })}
            onClick={onClick}
        >
            <div className={styles.imageWrap}>
                <img
                    src={nft.imageURL}
                    alt={nft.name}
                    className={styles.image}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.name}>
                    {nft.name}
                </div>

                <div className={styles.game}>
                    {nft.collection.name}
                </div>
            </div>
        </div>
    );
}