import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import useSWRImmutable from 'swr/immutable';
import { SearchCategory, fetchSearchResults } from '../fetch/fetchSearchResults';

export function useSearch({
    category,
    query
}: {
    category: SearchCategory,
    query: string
}) {
    const sanitizedQuery = encodeURIComponent(query) ?? '';
    const debouncedQuery = useDebounce(sanitizedQuery, 400);

    const fetcher = async ([category, query]: [category: SearchCategory, query: string]) => {
        await new Promise(r => setTimeout(r, 100));

        const items = await fetchSearchResults(category, query);
        const slicedItems = items?.slice(0, 4);

        return slicedItems ?? [];
    };

    const { data, error, isLoading } = useSWRImmutable([category, debouncedQuery], fetcher);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (sanitizedQuery && sanitizedQuery !== debouncedQuery) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [sanitizedQuery, debouncedQuery]);

    return {
        data,
        error,
        isLoading: isLoading || loading
    };
}