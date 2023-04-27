import { Title, Button } from '@/uikit';
import { CollectionTable } from '@/components/Collections';
import { useCollectionQuery } from '@/states/collection/hooks/useCollectionsQuery';
import styles from './PopularCollections.module.scss';

export function PopularCollections() {
    return (
        <div className={styles.wrapper}>
            <Title className={styles.title}>
                Trending Collections
            </Title>

            <CollectionTable />
        </div>
    );

}
