import { useEffect, useState } from 'react';
import { SearchInput } from '@/components/Menus/Search/Input/SearchInput';
import { SearchResults } from '@/components/Menus/Search/Results/SearchResults';
import { ComboboxList, useComboboxStore as useComboboxState } from '@ariakit/react';
import { useDebounce } from '@/hooks/useDebounce';
import { SEARCH_DEBOUNCE_TIMEOUT } from '@/config/constants';
import styles from './MobileSearch.module.scss';

export function MobileSearch() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_TIMEOUT);

    const comboboxState = useComboboxState({
        value: searchQuery,
        setValue: setSearchQuery
    });

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
                <SearchResults searchQuery={debouncedSearchQuery} />
            </ComboboxList>
        </div>
    );
}