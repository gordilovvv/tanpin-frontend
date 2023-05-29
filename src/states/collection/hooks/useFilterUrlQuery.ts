import { useSearchParams } from 'react-router-dom';
import { useFilterStore } from '../filterStore';
import { useEffect } from 'react';

export function useFilterUrlQuery() {
    const [, setSearchParams] = useSearchParams();
    const { collectionID, search, sort, status, minPrice, maxPrice }
        = useFilterStore(store => ({
            collectionID: store.collectionID,
            search: store.search,
            sort: store.sort,
            status: store.status,
            minPrice: store.minPrice,
            maxPrice: store.maxPrice,

            // TODO
            // attributes: store.attributes
        }));
    useEffect(() => {
        const params = new URLSearchParams();
        params.set('collectionID', collectionID);
        params.set('search', search);
        params.set('sort', sort);
        params.set('status', status);
        params.set('minPrice', minPrice);
        params.set('maxPrice', maxPrice);
        // TODO
        // params.set('attributes', JSON.stringify(attributes));
        setSearchParams(params);
    }, [collectionID, search, sort, status, minPrice, maxPrice, setSearchParams]);
}
