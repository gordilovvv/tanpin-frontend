import { useCallback } from 'react';
import { useCollectionsFilterStore } from '../CollectionsFilterStore';

export function useCollectionsFilterActions() {
    const [setSort, setSearch, replaceFilterState] = useCollectionsFilterStore(state => [
        state.setSort,
        state.setSearch,
        state.replaceFilterState,
    ]);

    const handleSort: typeof setSort = useCallback((sort) => {
        const state = useCollectionsFilterStore.getState();

        if (state.sort !== sort) {
            setSort(sort);
        }
    }, [setSort]);

    const handleSearch: typeof setSearch = useCallback((search) => {
        const state = useCollectionsFilterStore.getState();

        if (state.search !== search) {
            setSearch(search);
        }
    }, [setSearch]);

    return {
        handleSort,
        handleSearch,
        handleReplaceFilterState: replaceFilterState
    };
}