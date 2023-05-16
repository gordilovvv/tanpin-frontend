import { useSearchParams } from 'react-router-dom';

export function useNFTFilterFromQuery() {
    const [searchParams] = useSearchParams();

    return {
        min: searchParams.get('min'),
        max: searchParams.get('max'),
        collectionID: searchParams.get('collectionID'),
        search: searchParams.get('search'),
        sort: searchParams.get('sort'),
        status: searchParams.get('status'),
    };
}
