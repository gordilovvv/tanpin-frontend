import { useCallback } from 'react';
import { useCollectionsFilterStore } from '../CollectionsFilterStore';

export function useCollectionsFilterActions() {
    const [setSort, replaceFilterState] = useCollectionsFilterStore(state => [
        state.setSort,
        state.replaceFilterState,
    ]);

    const handleSort: typeof setSort = useCallback((sort) => {
        const state = useCollectionsFilterStore.getState();

        if (state.sort !== sort) {
            setSort(sort);
        }
    }, [setSort]);

    return {
        handleSort,
        handleReplaceFilterState: replaceFilterState
    };
}