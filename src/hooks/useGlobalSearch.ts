import { useEffect, useState } from 'react';

export enum SearchTask {
    NFT = 'NFT',
    GAME = 'GAME',
    COLLECTION = 'COLLECTION'
}

export function useGlobalSearch<Item>(
    searchQuery: string,
    onFetch: (searchQuery: string, signal?: AbortSignal) => Promise<Item[]>,
    onError: (message: string) => void,
) {
    const [items, setItems] = useState<Item[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function load(controller: AbortController) {
            try {
                setIsLoading(true);

                const signal = controller.signal;
                const items = await onFetch(
                    searchQuery,
                    signal
                );

                setItems(items.slice(0, 4));
            } catch (error) {
                onError((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        }

        if (!isLoading) {
            const controller = new AbortController();

            load(controller);

            return () => controller.abort();
        }
    }, [searchQuery]);

    return {
        items,
        isLoading
    };
}