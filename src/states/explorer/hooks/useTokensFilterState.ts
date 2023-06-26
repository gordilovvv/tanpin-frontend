import { useMemo } from 'react';
import { useTokensFilterStore } from '../TokensFilterStore';

export function useTokensFilterState() {
    const [minPrice, maxPrice, attributes, search, sort, status] = useTokensFilterStore(state => [
        state.minPrice,
        state.maxPrice,
        state.attributes,
        state.search,
        state.sort,
        state.status
    ]);

    return useMemo(() => {
        return {
            minPrice,
            maxPrice,
            attributes,
            search,
            sort,
            status
        };
    }, [minPrice, maxPrice, attributes, search, sort, status]);
}