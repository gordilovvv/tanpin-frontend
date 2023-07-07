import { useEffect, useState } from 'react';
import { useSearchStore } from '../store';

export enum SearchTask {
    NFT = 'NFT',
    GAME = 'GAME',
    COLLECTION = 'COLLECTION'
}

export function useSearch<Res>({
    searchQuery,
    fetchCallback
}: {
    searchQuery: string,
    fetchCallback: (searchQuery: string, signal?: AbortSignal) => Promise<Res[] | undefined>
}) {
    const [items, setItems] = useState<Res[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onError = useSearchStore(state => state.setSearchError);

    useEffect(() => {
        if (isLoading || !searchQuery) {
            return;
        }

        const load = async () => {
            try {
                setIsLoading(true);

                const items = await fetchCallback(searchQuery);

                if (items?.length) {
                    setItems(items.slice(0, 4));
                }
            } catch (error) {
                onError((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, [searchQuery]);

    return {
        items,
        isLoading
    };
}