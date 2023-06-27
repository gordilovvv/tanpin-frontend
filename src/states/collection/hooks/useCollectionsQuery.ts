import { useCallback, useEffect,  useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { collectionFetch } from '../fetch/fetchCollections';
import { Collection, CollectionQueryBody } from '../types';
import { PAGE_SIZE } from '@/config/constants';

export const useCollectionsQuery = (body: CollectionQueryBody) => {
    //rename useCollections
    const [offset, setOffset] = useState(0);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [limit, setLimit] = useState(1);

    useEffect(() => {
        setOffset(0);
        setCollections([]);
    }, [body.filter, body.filter]);

    const { data, isLoading } = useSWRImmutable(
        ['collectionsList', {filter: body.filter,offset}],
        () => collectionFetch({filter: body.filter, offset, limit: PAGE_SIZE})
    );
   
    useEffect(()=>{
        if (data) {
            const {collections : fetchedCollections, counts} = data;
            setCollections((prev)=>([...prev,...fetchedCollections]));
            setLimit(counts);
        }
    },[data]);

   
    const loadMore = useCallback(()=>{
        setOffset(prev=>prev+PAGE_SIZE);
    }, []);

    const hasLoadMore =  (offset + PAGE_SIZE + 1 ) <= limit;
    const isFirstLoading = collections.length === 0;
    return {
        collections,
        isFirstLoading,
        isLoading,
        loadMore,
        hasLoadMore,
    };
};
