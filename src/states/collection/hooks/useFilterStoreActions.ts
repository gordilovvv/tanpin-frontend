import { useFilterStore } from '../filterStore';

export function useFilterStoreActions() {
    return useFilterStore(({ setMinPrice, setMaxPrice, addAttribute, removeAttribute, setCollectionID, setSort, setSearch, setStatus }) => ({
        setMinPrice,
        setMaxPrice,
        addAttribute,
        removeAttribute,
        setCollectionID,
        setSort,
        setSearch,
        setStatus
    }));
}
