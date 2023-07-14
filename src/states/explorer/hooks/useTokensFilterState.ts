import { useMemo } from 'react';
import { useTokensFilterStore } from '../TokensFilterStore';

export function useTokensFilterState() {
    const [hash, minPrice, maxPrice, attributes, search, sort, status] = useTokensFilterStore(state => [
        state.hash,
        state.minPrice,
        state.maxPrice,
        state.attributes,
        state.search,
        state.sort,
        state.status
    ]);

    return useMemo(() => {
        return {
            hash,
            minPrice,
            maxPrice,
            attributes,
            search,
            sort,
            status
        };
    }, [hash, minPrice, maxPrice, attributes, search, sort, status]);
}