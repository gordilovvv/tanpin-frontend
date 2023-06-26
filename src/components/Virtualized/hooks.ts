import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

function createNonce() {
    return uuid();
}

// TODO: проверить
export function useVirtualizedGridState<T>(itemsFetcher: (offset: number, limit: number) => Promise<{ items: T[], total: number }>) {
    const nonce = useRef<string | null>(null);
    const index = useRef<number>(0);
    const [loading, setLoading] = useState(0);
    const [finished, setFinished] = useState(false);
    const [items, setItems] = useState<any[]>([]);

    const loadItems = useCallback(async (params: { startIndex: number, stopIndex: number }) => {
        try {
            if (finished || params.startIndex < index.current) {
                return;
            }

            const requestNonce = createNonce();
            const loadingCount = params.stopIndex - params.startIndex + 1;

            setLoading(loadingCount);

            nonce.current = requestNonce;
            index.current = index.current + loadingCount;

            const { items, total } = await itemsFetcher(
                params.startIndex,
                params.stopIndex
            );

            if (requestNonce !== nonce.current) {
                return;
            }

            index.current = index.current - (loadingCount - items.length);

            setItems(prev => [...prev, ...items]);
            setLoading(0);
            setFinished(index.current >= total);
        } catch {
            index.current -= loading;
            setLoading(0);
        }
    }, [finished, loading, index, itemsFetcher, setLoading, setFinished, setItems]);

    const refresh = () => {
        setItems([]);
        setLoading(0);
        setFinished(false);

        index.current = 0;
    };

    useEffect(() => {
        return () => refresh();
    }, []);

    useEffect(() => {
        refresh();
    }, [itemsFetcher]);

    return {
        index: index.current,
        items,
        loading,
        finished,
        loadItems
    };
}

// type State = {
//     items: any[],
//     index: number,
//     loading: number,
//     finished: boolean
// }

// const useStore = create<State & { setState: (state: Partial<State>) => void }>((set) => ({
//     items: [],
//     index: -1,
//     loading: 0,
//     finished: false,
//     setState: (state) => {
//         set({ ...state });
//     }
// }));

// export function useVirtualizedGridState<T>(itemsFetcher: (offset: number, limit: number) => Promise<{ items: T[], total: number }>) {
//     const nonce = useRef<string | null>(null);
//     const index = useRef<number>(0);
//     const loading = useRef<number>(0);
//     const { items, finished, setState } = useStore(state => state);

//     console.log(useStore.getState(), {
//         index: index.current,
//         loading: loading.current
//     });

//     const handleStart = (params: { startIndex: number, stopIndex: number }) => {
//         const newLoading = params.stopIndex - params.startIndex + 1;

//         index.current = index.current + newLoading;
//         loading.current = newLoading;
//     };

//     const handleResponse = (requestNonce: string, resItems: T[], total: number) => {
//         if (requestNonce === nonce.current) {
//             const finalIndex = index.current - (loading.current - resItems.length);

//             setState({
//                 items: [
//                     ...items,
//                     ...resItems
//                 ],
//                 // index: finalIndex,
//                 // loading: 0,
//                 finished: finalIndex >= total
//             });

//             index.current = finalIndex;
//             loading.current = 0;
//         } else {
//             setState({
//                 // index: index - loading,
//                 // loading: 0
//             });

//             index.current = index.current - loading.current;
//             loading.current = 0;
//         }
//     };

//     const handleError = () => {
//         setState({
//             // index: index - loading,
//             // loading: 0
//         });

//         index.current = index.current - loading.current;
//         loading.current = 0;
//     };

//     const createNonce = () => {
//         const str = uuid();

//         nonce.current = str;

//         return nonce.current as string;
//     };

//     const loadItems = useCallback(async (params: { startIndex: number, stopIndex: number }) => {
//         try {
//             if (finished || params.startIndex < index.current) {
//                 return;
//             }

//             const requestNonce = createNonce();

//             handleStart(params);

//             const { items, total } = await itemsFetcher(
//                 params.startIndex,
//                 params.stopIndex - params.startIndex
//             );

//             handleResponse(
//                 requestNonce,
//                 items,
//                 total
//             );
//         } catch (error) {
//             handleError();
//         }
//     }, [finished, index, itemsFetcher]);

//     const refresh = () => {
//         setState({
//             items: [],
//             // index: -1,
//             // loading: 0,
//             finished: false
//         });

//         index.current = -1;
//         loading.current = 0;
//     };

//     useEffect(() => {
//         return () => refresh();
//     }, []);

//     useEffect(() => {
//         refresh();
//     }, [itemsFetcher]);

//     return {
//         index: index.current,
//         items,
//         loading: loading.current,
//         finished,
//         loadItems
//     };
// }