import { useMemo } from 'react';
import { useCollectionsFilterStore } from '../CollectionsFilterStore';

export function useCollectionsFilterState(params?: {
    gameID?: string,
    popular?: boolean
}) {
    const { gameID, popular } = params ?? {};
    const sort = useCollectionsFilterStore(state => state.sort);

    return useMemo(() => {
        return {
            sort,
            gameID,
            popular
        };
    }, [sort, gameID, popular]);
}