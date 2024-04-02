import { Collection } from '@/states/collection/types';
import { Image, ImageSkeleton, Skeleton } from '@/uikit';
import { CollectionLogo } from '../Logo/CollectionLogo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './CollectionCard.module.scss';

type CollectionCardProps = {
    collection: Collection
}

export function CollectionCard({ collection }: CollectionCardProps) {
    return (
        <Link
            to={`/collection/${collection.ID}`}
            className={styles.card}
        >
            <div className={styles.coverWrap}>
                <Image
                    src={collection.coverUrl}
                    alt={collection.name}
                    className={styles.cover}
                    pending={<ImageSkeleton className={styles.coverSkeleton} />}
                />
            </div>

            <div className={styles.stack}>
                <CollectionLogo
                    size="s"
                    image={collection.logoUrl}
                />

                <div className={styles.info}>
                    <div className={styles.name}>
                        {collection.name}
                    </div>

                    <div className={styles.game}>
                        {collection.gameName}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function CollectionCardSkeleton() {
    return (
        <div className={classNames(styles.card, styles.loading)}>
            <div className={styles.coverWrap}>
                <ImageSkeleton className={styles.coverSkeleton} />
            </div>

            <div className={styles.stack}>
                <Skeleton className={styles.skeletonLogo} />

                <div className={styles.info}>
                    <Skeleton className={styles.skeletonName} />
                    <Skeleton className={styles.skeletonGame} />
                </div>
            </div>
        </div>
    );
}