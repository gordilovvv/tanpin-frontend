import { PercentBadge } from "@/uikit";
import { CollectionLogo } from '@/components/Collections';
import { Collection } from '@/states/collection/types';
import { Link } from "react-router-dom";
import { formatTokenAmount } from "@/utils/formatTokenAmount";
import classNames from 'classnames';
import styles from './CollectionRow.module.scss';

type CollectionRowProps = {
    collection: Collection,
    index: number,
    loading?: boolean
};

export function CollectionRow({ collection, index, loading }: CollectionRowProps) {
    const { name, logoURL, stats } = collection;

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
                        image={logoURL}
                    />

                    <div className={styles.metadataContent}>
                        <div className={styles.metadataName}>{name}</div>
                        {/* TODO: add description */}
                        {/* <div className={styles.metadataDescription}>{description}</div> */}
                    </div>
                </div>

                <div className={styles.col}>
                    <span className={styles.mobileLabel}>Floor Price</span> <span>{formatTokenAmount(stats.floor.amount)} {stats.floor.currency}</span>
                </div>

                <div className={styles.col}>
                    <span className={styles.mobileLabel}>Items</span> <span>{stats.items}</span>
                </div>

                <div className={styles.col}>
                    <span className={styles.mobileLabel}>Sales (7D)</span> <span>{stats.sales}</span>
                </div>

                <div className={styles.col}>
                    <span className={styles.mobileLabel}>Volume (7D)</span> <span>{formatTokenAmount(stats.volume.amount)} {stats.volume.currency}</span>
                </div>

                <div className={styles.col}>
                    {/* TODO: Add percent Badge */}
                    <PercentBadge value={0} />
                </div>
            </div>
        </Link>
    );
}
