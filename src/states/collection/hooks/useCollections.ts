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

    const { isLoading, error } = useSWRImmutable(
        ['collection.list', {
            filter,
            offset,
            limit: limit.current
        }],
        async ([_, requestPayload]) => {
            const { collections, counts } = await collectionFetch(requestPayload);

            setCollections((prev) => ([
                ...prev,
                ...collections
            ]));

            if (requestPayload.offset + limit.current >= counts) {
                setFinished(true);
            }
        }
    );

    const hasError = !!error;

    useEffect(() => {
        if (offset > 0) {
            setOffset(0);
            setCollections([]);
        }
    }, [filter]);

    // Reset on unmount
    useEffect(() => {
        return () => {
            setOffset(0);
        };
    }, []);

    const loadMore = useCallback(() => {
        setOffset(offset => offset + limit.current);
    }, [limit.current, setOffset]);

    return {
        loadMore,
        collections,
        isLoading,
        isFinished,
        hasError
    };
}
