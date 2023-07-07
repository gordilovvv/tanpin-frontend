import useSWRImmutable from 'swr/immutable';
import { fetchPopularCollections } from '../fetch/fetchPopularCollections';

/**
 * We use this hook in Search Popover
 */
export function usePopularCollections() {
    const { data, isLoading } = useSWRImmutable(
        'search.collection.popular',
        fetchPopularCollections
    );

    return {
        isLoading,
        collections: data ?? []
    };
}