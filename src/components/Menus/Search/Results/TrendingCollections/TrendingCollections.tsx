import { SearchItem, SearchItemPlaceholder } from '../Item/SearchItem';

import { usePopularCollections } from '@/states/collection/hooks/usePopularCollections';
import styles from './TrendingCollections.module.scss';

export function TrendingCollections() {
    const { collections, isLoading } = usePopularCollections();

    const renderList = () => {
        if (isLoading) {
            return (
                <>
                    <SearchItemPlaceholder index={0} />
                    <SearchItemPlaceholder index={1} />
                    <SearchItemPlaceholder index={2} />
                    <SearchItemPlaceholder index={3} />
                </>
            );
        }

        return (
            <>
                {collections.map(collection => <SearchItem
                    key={collection.ID}
                    href={`/collections/${collection.ID}`}
                    name={collection.name}
                    image={collection.logoURL}
                />)}
            </>
        );
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.title}>
                Popular collections
            </div>

            <div className={styles.list}>
                {renderList()}
            </div>
        </div>
    );
}