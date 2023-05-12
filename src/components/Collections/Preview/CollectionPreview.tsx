import { Link } from 'react-router-dom';
import { CollectionLogo } from '..';
import { Collection } from '@/states/collection/types';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './CollectionPreview.module.scss';
import classNames from 'classnames';

type CollectionPreviewProps = {
    collection: Collection | undefined,
};

export const CollectionPreview = ({ collection }: CollectionPreviewProps) => {
    if (!collection) {
        return (
            <div className={classNames(styles.wrap, styles.loader)}></div>
        );
    }

    const { name, logoURL, stats } = collection;
    return (
        <Link
            to='/'
            className={styles.wrap}
        >
            <CollectionLogo
                size='l'
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
