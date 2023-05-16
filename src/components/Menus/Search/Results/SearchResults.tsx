import { useCallback, useEffect, useState } from 'react';
import { ToggleButton, ToggleGroup } from '@/uikit';
import { CollectionsList, GamesList, NFTList } from './List';
import { TrendingCollections } from './TrendingCollections/TrendingCollections';
import { SearchTask } from '@/hooks/useGlobalSearch';
import styles from './SearchResults.module.scss';

type SearchResultsProps = {
    searchQuery: string
}

export function SearchResults({ searchQuery }: SearchResultsProps) {
    const [searchTask, setSearchTask] = useState<SearchTask>(SearchTask.NFT);
    const [searchError, setSearchError] = useState<string | undefined>();

    // Clear error on type search query
    useEffect(() => {
        if (searchError) {
            setSearchError(undefined);
        }
    }, [searchQuery]);

    const renderSuggestsList = useCallback(() => {
        if (searchError) {
            return (
                <div className={styles.error}>
                    {searchError}
                </div>
            );
        }

        if (searchTask === SearchTask.COLLECTION) {
            return (
                <CollectionsList
                    searchQuery={searchQuery}
                    onError={setSearchError}
                />
            );
        }

        if (searchTask === SearchTask.GAME) {
            return (
                <GamesList
                    searchQuery={searchQuery}
                    onError={setSearchError}
                />
            );
        }

        return (
            <NFTList
                searchQuery={searchQuery}
                onError={setSearchError}
            />
        );
    }, [searchQuery, searchError, searchTask]);

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
                    NFT
                </ToggleButton>

                <ToggleButton
                    active={searchTask === SearchTask.GAME}
                    onClick={() => setSearchTask(SearchTask.GAME)}
                >
                    Games
                </ToggleButton>

                <ToggleButton
                    active={searchTask === SearchTask.COLLECTION}
                    onClick={() => setSearchTask(SearchTask.COLLECTION)}
                >
                    Collections
                </ToggleButton>
            </ToggleGroup>

            <div className={styles.list}>
                {renderSuggestsList()}
            </div>
        </div>
    );
}