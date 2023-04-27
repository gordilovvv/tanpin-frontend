import { PercentBadge, Skeleton } from '@/uikit';
import { CollectionLogo } from '@/components/Collections';
import { Collection } from '@/states/collection/types';
import { Link } from 'react-router-dom';
import { isTouchDevice } from "@/utils/isTouchDevice";
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import classNames from 'classnames';
import styles from './CollectionRow.module.scss';

type CollectionRowProps = {
    collection?: Collection,
    index: number
};

const skeletonWidths = {
    desktop: [
        // Percents
        [32, 40, 26],
        // Pixels
        [56, 64, 72],
        [64, 48, 32],
        [48, 56, 48],
        [64, 72, 96],
        [72, 72, 72]
    ],
    mobile: [
        // Percents
        [100, 100, 100],
        // Pixels
        [160, 160, 160],
        [128, 128, 128],
        [180, 180, 180],
        [72, 72, 72],
        [96, 96, 96]
    ]
}

const Loader = ({ number }: { number: number }) => {
    const widthIndex = number % 3;
    const widthsData = isTouchDevice ? skeletonWidths.mobile : skeletonWidths.desktop;

    return (
        <div className={classNames(styles.row, styles.loading)}>
            <div className={styles.wrap}>
                <div className={classNames(styles.col, styles.secondary)}>
                    {number}
                </div>

                <div className={styles.col}>
                    <Skeleton
                        className={styles.skeletonMetadata}
                        style={{ width: `${widthsData[0][widthIndex]}%` }}
                    />
                </div>

                <div className={styles.col}>
                    <Skeleton
                        className={styles.skeletonText}
                        style={{ width: `${widthsData[1][widthIndex]}px` }}
                    />
                </div>

                <div className={styles.col}>
                    <Skeleton
                        className={styles.skeletonText}
                        style={{ width: `${widthsData[2][widthIndex]}px` }}
                    />
                </div>

                <div className={styles.col}>
                    <Skeleton
                        className={styles.skeletonText}
                        style={{ width: `${widthsData[3][widthIndex]}px` }}
                    />
                </div>

                <div className={styles.col}>
                    <Skeleton
                        className={styles.skeletonText}
                        style={{ width: `${widthsData[4][widthIndex]}px` }}
                    />
                </div>

                <div className={styles.col}>
                    <Skeleton
                        className={styles.skeletonText}
                        style={{ width: `${widthsData[5][widthIndex]}px` }}
                    />
                </div>
            </div>
        </div>
    );
};

export function CollectionRow({ collection, index }: CollectionRowProps) {
    if (!collection) {
        return <Loader number={index + 1} />;
    }

    return (
        <Link
            to='/'
            className={styles.row}
        >
            <div className={styles.wrap}>
                <div className={classNames(styles.col, styles.secondary)}>
                    {index + 1}
                </div>

                <div className={classNames(styles.col, styles.metadata)}>
                    <CollectionLogo
                        size="s"
                        image={collection.logoURL}
                    />

                    <div className={styles.metadataContent}>
                        <div className={styles.metadataName}>{collection.name}</div>
                        {/* TODO: add description */}
                        {/* <div className={styles.metadataDescription}>{description}</div> */}
                    </div>
                </div>

                <div className={styles.col}>
                    <span className={styles.mobileLabel}>Floor Price</span> <span>{formatTokenAmount(collection.stats.floor.amount)} {collection.stats.floor.currency}</span>
                </div>

                <div className={styles.col}>
                    <span className={styles.mobileLabel}>Items</span> <span>{collection.stats.items}</span>
                </div>

                <div className={styles.col}>
                    <span className={styles.mobileLabel}>Sales (7D)</span> <span>{collection.stats.sales}</span>
                </div>

                <div className={styles.col}>
                    <span className={styles.mobileLabel}>Volume (7D)</span> <span>{formatTokenAmount(collection.stats.volume.amount)} {collection.stats.volume.currency}</span>
                </div>

                <div className={styles.col}>
                    {/* TODO: Add percent Badge */}
                    <PercentBadge value={0} />
                </div>
            </div>
        </Link>
    )
}
