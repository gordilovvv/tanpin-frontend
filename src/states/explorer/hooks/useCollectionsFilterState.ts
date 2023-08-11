import { useMemo } from 'react';
import { useCollectionsFilterStore } from '../CollectionsFilterStore';

export function useCollectionsFilterState(params?: {
    gameID?: string,
    popular?: boolean
}) {
    const { gameID, popular } = params ?? {};
    const [search, sort] = useCollectionsFilterStore(state => [
        state.search,
        state.sort,
    ]);

    return useMemo(() => {
        return {
            search,
            sort,
            gameID,
            popular
        };
    }, [search, sort, gameID, popular]);
}