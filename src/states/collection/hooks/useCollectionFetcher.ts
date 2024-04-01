import useSWRImmutable from 'swr/immutable';
import { fetchCollection } from '../fetch/fetchCollection';

export function useCollectionFetcher(collectionID: string) {
    const { data: collection, isLoading, error } = useSWRImmutable(
        ['collection', collectionID],
        () => fetchCollection(collectionID),
        { revalidateOnFocus: true }
    );

    return {
        collection,
        isLoading,
        error
    };
}