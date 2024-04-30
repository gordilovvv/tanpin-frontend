import { useCallback, useEffect, useState } from 'react';
import { SearchInput } from '@/components/Menus/Search/Input/SearchInput';
import { SearchResults } from '@/components/Menus/Search/Results/SearchResults';
import { ComboboxList, useComboboxStore as useComboboxState } from '@ariakit/react';
import { SearchCategory } from '@/states/search/fetch/fetchSearchResults';
import styles from './MobileSearch.module.scss';

export function MobileSearch() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchCategory, setSearchCategory] = useState<SearchCategory>(SearchCategory.NFTS);

    const comboboxState = useComboboxState({
        value: searchQuery,
        setValue: setSearchQuery
    });

    const resetSearch = useCallback(() => {
        setSearchQuery('');
        setSearchCategory(SearchCategory.NFTS);
    }, [setSearchQuery, setSearchCategory]);

    // Show ComboboxList on mount
    useEffect(() => {
        comboboxState.setState('mounted', true);
    }, []);

    return (
        <div className={styles.wrap}>
            <SearchInput
                state={comboboxState}
                className={styles.search}
            />

            <ComboboxList
                hidden={false}
                store={comboboxState}
                className={styles.results}
            >
                <SearchResults
                    searchQuery={searchQuery}
                    searchCategory={searchCategory}
                    onSearchCategory={setSearchCategory}
                    onSearchReset={resetSearch}
                />
            </ComboboxList>
        </div>
    );
}