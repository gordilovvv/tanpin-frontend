import { useCallback } from 'react';
import { TokensFilterState, initialTokensFilterState, useTokensFilterStore } from '../TokensFilterStore';

export function useTokensFilterActions({ filterImmediately }: {
    filterImmediately: boolean
}) {
    const [setPrice, addAttribute, removeAttribute, setSort, setSearch, setStatus, replaceFilterState, updateHash] = useTokensFilterStore(state => [
        state.setPrice,
        state.addAttribute,
        state.removeAttribute,
        state.setSort,
        state.setSearch,
        state.setStatus,
        state.replaceFilterState,
        state.updateHash
    ]);

    const applyFilters = useCallback(() => {
        updateHash();
    }, [updateHash]);

    const resetFilters = useCallback(() => {
        replaceFilterState(initialTokensFilterState);
        updateHash();
    }, [updateHash, replaceFilterState]);

    const handleMinPrice = useCallback((price: TokensFilterState['minPrice']) => {
        const state = useTokensFilterStore.getState();

        if (state.minPrice !== price) {
            setPrice(price, 'min');
            filterImmediately && applyFilters();
        }
    }, [setPrice, filterImmediately, applyFilters]);

    const handleMaxPrice = useCallback((price: TokensFilterState['maxPrice']) => {
        const state = useTokensFilterStore.getState();

        if (state.maxPrice !== price) {
            setPrice(price, 'max');
            filterImmediately && applyFilters();
        }
    }, [setPrice, filterImmediately, applyFilters]);

    const handleAddAttribute: typeof addAttribute = useCallback((attribute) => {
        addAttribute(attribute);
        filterImmediately && applyFilters();
    }, [addAttribute, filterImmediately, applyFilters]);

    const handleRemoveAttribute: typeof removeAttribute = useCallback((attribute) => {
        removeAttribute(attribute);
        filterImmediately && applyFilters();
    }, [removeAttribute, filterImmediately, applyFilters]);

    const handleSort: typeof setSort = useCallback((sort) => {
        const state = useTokensFilterStore.getState();

        if (state.sort !== sort) {
            setSort(sort);
            filterImmediately && applyFilters();
        }
    }, [setSort, filterImmediately, applyFilters]);

    const handleSearch: typeof setSearch = useCallback((search) => {
        const state = useTokensFilterStore.getState();

        if (state.search !== search) {
            setSearch(search);
            filterImmediately && applyFilters();
        }
    }, [setSearch, filterImmediately, applyFilters]);

    const handleStatus: typeof setStatus = useCallback((status) => {
        const state = useTokensFilterStore.getState();

        if (state.status !== status) {
            setStatus(status);
            filterImmediately && applyFilters();
        }
    }, [setStatus, filterImmediately, applyFilters]);

    const handleReplaceFilterState: typeof replaceFilterState = useCallback((state) => {
        replaceFilterState(state);
        applyFilters();
    }, [replaceFilterState, applyFilters]);

    return {
        applyFilters,
        resetFilters,
        handleMinPrice,
        handleMaxPrice,
        handleAddAttribute,
        handleRemoveAttribute,
        handleSort,
        handleSearch,
        handleStatus,
        handleReplaceFilterState
    };
}
