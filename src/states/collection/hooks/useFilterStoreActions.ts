import { useFilterStore } from '../filterStore';

export function useFilterStoreActons() {
    const addAttribute = useFilterStore(store => store.addAttribute);
    const removeAttribute = useFilterStore(store => store.removeAttribute);
    const clearAllOfTraitType = useFilterStore(store => store.clearAllOfTraitType);
    const setSearch = useFilterStore(store => store.setSearch);
    const setSort = useFilterStore(store => store.setSort);
    const setStatus = useFilterStore(store => store.setStatus);
    const setCollectionID = useFilterStore(store => store.setCollectionID);
    const clearAttributes = useFilterStore(store => store.clearAttributes);

    return {
        addAttribute,
        removeAttribute,
        clearAllOfTraitType,
        setSearch,
        setSort,
        setStatus,
        setCollectionID,
        clearAttributes
    };
}
