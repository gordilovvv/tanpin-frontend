import { Link } from 'react-router-dom';
import styles from './CollectionPreview.module.scss';
import { CollectionLogo } from '..';
import { Collection } from '@/states/collection/types';

type CollectionPreviewProps = Collection;

export const CollectionPreview = ({ name, logoURL, stats: { volume, floor } }: CollectionPreviewProps) => {
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
                            {floor.amount} <span>{floor.currency}</span>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemLabel}>
                            Volume (1D)
                        </div>

                        <div className={styles.itemValue}>
                            {volume.amount} <span>{volume.currency}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
