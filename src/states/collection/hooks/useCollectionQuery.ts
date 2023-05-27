import useSWRImmutable from 'swr/immutable';
import { fetchCollection } from '../fetch/fetchCollection';
import { Collection } from '../types';

export function useCollectionQuery(collectionID: string) {
    const { data: collection, isLoading, error } = useSWRImmutable<Collection>(
        ['collection', collectionID],
        () => fetchCollection(collectionID)
    );

    return {
        collection,
        isLoading,
        error
    };
}
