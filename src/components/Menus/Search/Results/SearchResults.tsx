import { useEffect, useMemo, useState } from 'react';
import { ToggleButton, ToggleGroup } from '@/uikit';
import { NFTList } from './List/NFTList';
import { CollectionsList } from './List/CollectionsList';
import { TrendingCollections } from './TrendingCollections/TrendingCollections';
import { SearchTask } from '@/states/search/hooks/useSearch';
import { useSearchStore } from '@/states/search/store';
import { useTranslation } from '@/localization';
import styles from './SearchResults.module.scss';

type SearchResultsProps = {
    searchQuery: string
}

export function SearchResults({ searchQuery }: SearchResultsProps) {
    const { t } = useTranslation();
    const [searchTask, setSearchTask] = useState<SearchTask>(SearchTask.NFT);
    const searchError = useSearchStore(state => state.searchError);
    const setSearchError = useSearchStore(state => state.setSearchError);

    const suggestList = useMemo(() => {
        if (searchError) {
            return (<div className={styles.error}>
                {searchError}
            </div>);
        }

        if (searchTask === SearchTask.COLLECTION) {
            return (<CollectionsList searchQuery={searchQuery} />);
        }

        if (searchTask === SearchTask.NFT) {
            return (<NFTList searchQuery={searchQuery} />);
        }

        return null;
    }, [searchQuery, searchError, searchTask]);

    // Clear error on type search query
    useEffect(() => {
        if (searchError) {
            setSearchError(undefined);
        }
    }, [searchQuery, setSearchError]);

    if (!searchQuery) {
        return (
            <div className={styles.wrap}>
                <TrendingCollections />
            </div>
        );
    }

    return (
        <div className={styles.wrap}>
            <ToggleGroup>
                <ToggleButton
                    active={searchTask === SearchTask.NFT}
                    onClick={() => setSearchTask(SearchTask.NFT)}
                >
                    {t('NFT')}
                </ToggleButton>

                <ToggleButton
                    active={searchTask === SearchTask.COLLECTION}
                    onClick={() => setSearchTask(SearchTask.COLLECTION)}
                >
                    {t('Collections')}
                </ToggleButton>
            </ToggleGroup>

            <div className={styles.list}>
                {suggestList}
            </div>
        </div>
    );
}