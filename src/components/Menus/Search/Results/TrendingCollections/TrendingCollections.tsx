import { SearchItem } from '../Item/SearchItem';
import { ResultsPlaceholder } from '../Placeholder/ResultsPlaceholder';
import { ResultsEmpty } from '../Empty/ResultsEmpty';
import { usePopularCollections } from '@/states/search/hooks/usePopularCollections';
import styles from './TrendingCollections.module.scss';

export function TrendingCollections() {
    const { collections, isLoading } = usePopularCollections();

    const renderList = () => {
        if (isLoading) {
            return (<ResultsPlaceholder />);
        }

        if (!collections.length) {
            return (<ResultsEmpty />);
        }

        return (
            <>
                {collections.map(collection => <SearchItem
                    key={collection.ID}
                    href={`/${collection.gameID}/${collection.ID}`}
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