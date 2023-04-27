import { Link } from 'react-router-dom';
import { CollectionLogo } from '..';
import { Collection } from '@/states/collection/types';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './CollectionPreview.module.scss';

type CollectionPreviewProps = {
    collection: Collection
};

export const CollectionPreview = ({ collection }: CollectionPreviewProps) => {
    const { name, logoURL, stats } = collection;

    return (
        <Link
            to='/'
            className={styles.wrap}
        >
            <CollectionLogo
                size='m'
                image={logoURL}
                className={styles.logo}
            />

            <div className={styles.content}>
                <div className={styles.name}>{name}</div>

                <div className={styles.stats}>
                    <div className={styles.item}>
                        <div className={styles.itemLabel}>
                            Floor price
                        </div>

                        <div className={styles.itemValue}>
                            {formatTokenAmount(stats.floor.amount)} <span>{stats.floor.currency}</span>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemLabel}>
                            Volume (1D)
                        </div>

                        <div className={styles.itemValue}>
                            {formatTokenAmount(stats.volume.amount)} <span>{stats.volume.currency}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
