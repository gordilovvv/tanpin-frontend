import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import PQueue from 'p-queue';

function createNonce() {
    return uuid();
}

// // TODO: проверить
// export function useVirtualizedGridState<T>(itemsFetcher: (offset: number, limit: number) => Promise<{ items: T[], total: number }>) {
//     const nonce = useRef<string | null>(null);
//     const index = useRef<number>(0);
//     const [loading, setLoading] = useState(0);
//     const [finished, setFinished] = useState(false);
//     const [items, setItems] = useState<any[]>([]);

//     const loadItems = useCallback(async (params: { startIndex: number, stopIndex: number }) => {
//         try {
//             if (finished || params.startIndex < index.current) {
//                 return;
//             }

//             const requestNonce = createNonce();
//             const loadingCount = params.stopIndex - params.startIndex + 1;

//             setLoading(loadingCount);

//             nonce.current = requestNonce;
//             index.current = index.current + loadingCount;

//             const { items, total } = await itemsFetcher(
//                 params.startIndex,
//                 params.stopIndex
//             );

//             if (requestNonce !== nonce.current) {
//                 return;
//             }

//             index.current = index.current - (loadingCount - items.length);

//             setItems(prev => [...prev, ...items]);
//             setLoading(0);
//             setFinished(index.current >= total);
//         } catch {
//             index.current -= loading;
//             setLoading(0);
//         }
//     }, [finished, loading, index, itemsFetcher, setLoading, setFinished, setItems]);

//     const refresh = () => {
//         setItems([]);
//         setLoading(0);
//         setFinished(false);

//         index.current = 0;
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
//         loading,
//         finished,
//         loadItems
//     };
// }

// enum GridEvent {
//     IDLE = 'idle',
//     START_LOAD = 'startLoad',
//     LOADED = 'loaded'
// }

type State = {
    items: any[],
    index: number,
    loading: number,
    finished: boolean
}

const useStore = create<State & { setState: (partial: State | Partial<State> | ((state: State) => State | Partial<State>), replace?: boolean | undefined) => void }>((set) => ({
    items: [],
    index: 0,
    loading: 0,
    finished: false,
    setState: set
}));

export function useVirtualizedGridState<T>(itemsFetcher: (offset: number, limit: number) => Promise<{ items: T[], total: number }>) {
    const nonce = useRef<string | null>(null);
    const queue = useMemo(() => {
        return new PQueue({ concurrency: 1 });
    }, []);
    const { items, finished, index, loading, setState } = useStore(state => state);

    // console.log(useStore.getState());

    const handleStart = (params: { startIndex: number, stopIndex: number }) => {
        const newLoading = params.stopIndex - params.startIndex + 1;

        setState(state => ({
            index: state.index + newLoading,
            loading: newLoading
        }));
    };

    const handleResponse = (requestNonce: string, resItems: T[], total: number) => {
        if (requestNonce === nonce.current) {
            setState(state => {
                console.log({
                    items: [
                        ...state.items,
                        ...resItems
                    ],
                    index: state.index - (state.loading - resItems.length),
                    loading: 0,
                    finished: state.index - (state.loading - resItems.length) >= total
                });
                return {
                    items: [
                        ...state.items,
                        ...resItems
                    ],
                    index: state.index - (state.loading - resItems.length),
                    loading: 0,
                    finished: state.index - (state.loading - resItems.length) >= total
                };
            });
        } else {
            setState(state => ({
                index: state.index - state.loading,
                loading: 0
            }));
        }
    };

    const handleError = () => {
        setState({
            index: index - loading,
            loading: 0
        });
    };

    const loadItems = useCallback(async (params: { startIndex: number, stopIndex: number }) => {
        queue.add(async () => {
            try {
                // console.log(params);
                if (finished || params.startIndex < useStore.getState().index) {
                    return;
                }

                const requestNonce = createNonce();

                nonce.current = requestNonce;

                handleStart(params);

                const { items, total } = await itemsFetcher(
                    params.startIndex,
                    params.stopIndex
                );

                handleResponse(
                    requestNonce,
                    items,
                    total
                );
            } catch (error) {
                handleError();
            }
        });
    }, [queue, finished, index, itemsFetcher]);

    const refresh = () => {
        setState({
            items: [],
            index: 0,
            loading: 0,
            finished: false
        });
    };

    useEffect(() => {
        return () => refresh();
    }, []);

    useEffect(() => {
        refresh();
    }, [itemsFetcher]);

    return {
        index,
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

// type Actions = {
//     setState: (state: Partial<State>) => void
// }

// const useStore = create<State & Actions>(
//     set => ({
//         items: [],
//         index: 0,
//         loading: 0,
//         finished: false,
//         setState: (state) => {
//             set(prevState => ({
//                 ...prevState,
//                 state
//             }));
//         }
//     })
// );

// export function useVirtualizedGridState<T>(itemsFetcher: (offset: number, limit: number) => Promise<{ items: T[], total: number }>) {
//     const nonce = useRef<string | null>(null);
//     const { items, finished, index, loading, setState } = useStore(state => state);

//     // console.log(useStore.getState());

//     const handleStart = (params: { startIndex: number, stopIndex: number }) => {
//         const newLoading = params.stopIndex - params.startIndex + 1;

//         setState({
//             index: index + newLoading,
//             loading: newLoading
//         });
//     };

//     const handleResponse = (requestNonce: string, resItems: T[], total: number) => {
//         console.log({
//             requestNonce,
//             currentNonce: nonce.current,
//             condition: requestNonce === nonce.current
//         });

//         if (requestNonce === nonce.current) {
//             const finalIndex = index - (loading - resItems.length);

//             console.log(finalIndex, total, finalIndex >= total);

//             setState({
//                 items: [
//                     ...items,
//                     ...resItems
//                 ],
//                 index: finalIndex,
//                 loading: 0,
//                 finished: finalIndex >= total
//             });
//         } else {
//             setState({
//                 index: index - loading,
//                 loading: 0
//             });
//         }
//     };

//     const handleError = () => {
//         setState({
//             index: index - loading,
//             loading: 0
//         });
//     };

//     const createNonce = () => {
//         const str = uuid();

//         nonce.current = str;

//         return nonce.current as string;
//     };

//     const loadItems = useCallback(async (params: { startIndex: number, stopIndex: number }) => {
//         try {
//             if (finished || params.startIndex < index) {
//                 return;
//             }

//             const requestNonce = createNonce();

//             handleStart(params);

//             const { items, total } = await itemsFetcher(
//                 params.startIndex - 1,
//                 params.stopIndex - params.startIndex + 1
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
//             index: 0,
//             loading: 0,
//             finished: false
//         });
//     };

//     useEffect(() => {
//         return () => refresh();
//     }, []);

//     useEffect(() => {
//         refresh();
//     }, [itemsFetcher]);

//     return {
//         index,
//         items,
//         loading,
//         finished,
//         loadItems
//     };
// }