import { useCallback, useEffect, useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { collectionFetch } from '../fetch/fetchCollections';
import { Collection, CollectionsFilter } from '../types';

// TODO: ПЕРЕНЕСТИ НА СТОР
// Because of local offset & filter from store -> we trigger API twice
export function useCollections(filter: CollectionsFilter) {
    const limit = useRef<number>(20);
    const [offset, setOffset] = useState(0);
    const [isFinished, setFinished] = useState(false);
    const [collections, setCollections] = useState<Collection[]>([]);

    const { isLoading, error, mutate } = useSWRImmutable(
        ['collection.list', filter],
        async ([_, collectionsFilter]) => {
            const { collections, counts } = await collectionFetch({
                filter: collectionsFilter,
                offset,
                limit: limit.current
            });

            if (offset === 0) {
                setCollections(collections);
            } else {
                setCollections((prev) => ([...prev, ...collections]));
            }

            if (offset + limit.current >= counts) {
                setFinished(true);
            }
        }
    );

    const hasError = !!error;

    useEffect(() => {
        if (offset === 0) {
            setCollections([]);
        }
    }, [filter]);

    useEffect(() => {
        setOffset(0);
    }, [filter]);

    useEffect(() => {
        mutate();
    }, [offset]);

    const loadMore = useCallback(() => {
        setOffset((offset) => offset + limit.current);
    }, [limit.current, setOffset]);

    return {
        loadMore,
        collections,
        isLoading,
        isFinished,
        hasError
    };
}
