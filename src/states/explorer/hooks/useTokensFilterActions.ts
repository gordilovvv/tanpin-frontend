import { useTokensFilterStore } from '../TokensFilterStore';

export function useTokensFilterActions() {
    return useTokensFilterStore(({ setMinPrice, setMaxPrice, addAttribute, removeAttribute, setSort, setSearch, setStatus }) => ({
        setMinPrice,
        setMaxPrice,
        addAttribute,
        removeAttribute,
        setSort,
        setSearch,
        setStatus
    }));
}
