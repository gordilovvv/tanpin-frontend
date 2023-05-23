import { useCallback, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';

type State = {
    items: any[],
    index: number,
    loading: number,
    finished: boolean
}

const useStore = create<State & { setState: (state: Partial<State>) => void }>((set) => ({
    items: [],
    index: -1,
    loading: 0,
    finished: false,
    setState: (state) => {
        set({ ...state });
    }
}));

export function useVirtualizedGridState<T>(itemsFetcher: (offset: number, limit: number) => Promise<{ data: T[], total: number }>) {
    const nonce = useRef<string | null>(null);
    const { items, index, loading, finished, setState } = useStore(state => state);

    const handleStart = (params: { startIndex: number, stopIndex: number }) => {
        const newLoading = params.stopIndex - params.startIndex + 1;

        setState({
            loading: newLoading,
            index: index + newLoading
        });
    };

    const handleResponse = (requestNonce: string, resItems: T[], total: number) => {
        if (requestNonce === nonce.current) {
            const finalIndex = index - (loading - resItems.length);

            setState({
                items: [
                    ...items,
                    ...resItems
                ],
                index: finalIndex,
                loading: 0,
                finished: finalIndex >= total
            });
        } else {
            setState({
                index: index - loading,
                loading: 0
            });
        }
    };

    const handleError = () => {
        setState({
            index: index - loading,
            loading: 0
        });
    };

    const createNonce = () => {
        const str = uuid();

        nonce.current = str;

        return nonce.current as string;
    };

    const loadItems = useCallback(async (params: { startIndex: number, stopIndex: number }) => {
        try {
            if (finished || params.startIndex < index) {
                return;
            }

            const requestNonce = createNonce();

            handleStart(params);

            const { data, total } = await itemsFetcher(
                params.startIndex,
                params.stopIndex - params.startIndex
            );

            handleResponse(
                requestNonce,
                data,
                total
            );
        } catch (error) {
            handleError();
        }
    }, [finished, index]);

    const refresh = () => {
        setState({
            items: [],
            index: -1,
            loading: 0,
            finished: false 
        });
    };

    useEffect(() => {
        return () => refresh();
    }, []);

    return {
        index,
        items,
        loading,
        finished,
        loadItems
    };
}