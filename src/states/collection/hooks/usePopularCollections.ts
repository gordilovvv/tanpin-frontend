import useSWRImmutable from 'swr/immutable';
import { fetchPopularCollections } from '../fetch/fetchPopularCollections';

/**
 * We use this hook in Search Popover
 */
export function usePopularCollections() {
    const { data, isLoading } = useSWRImmutable(
        'search.collections.popular',
        fetchPopularCollections
    );

    return {
        isLoading,
        collections: data ?? []
    };
}