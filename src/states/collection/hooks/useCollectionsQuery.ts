import { useEffect, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { collectionFetch } from '../fetch/fetchCollections';
import { Collection, CollectionQueryBody } from '../types';

export const useCollectionsQuery = (body: CollectionQueryBody) => {
    const [collections, setCollections] = useState<{ [page: number]: Collection[] }>([]);
    const { data, isLoading } = useSWRImmutable(
        ['collectionsList', body],
        () => collectionFetch(body)
    );

    // On filter update - reset collections
    useEffect(() => {
        setCollections({});
    }, [body.filter]);

    // On get new collections contact it with previous
    useEffect(() => {
        if (data?.collections && data.page) {    
            setCollections(hashMap => ({
                ...hashMap,
                [data.page]: data.collections
            }));
        }
    }, [data?.collections, data?.page]);

    // Create list
    const collectionsList: Collection[] = [];

    for (const list of Object.values(collections)) {
        collectionsList.push(...list);
    }

    return {
        collections: collectionsList,
        page: data?.page,
        pageCount: data?.pageCount,
        isLoading
    };
};