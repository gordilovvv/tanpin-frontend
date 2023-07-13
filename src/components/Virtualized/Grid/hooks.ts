import { useCallback, useMemo, useRef } from 'react';
import { create } from 'zustand';
import PQueue from 'p-queue';
import { v4 as uuid } from 'uuid';
import { IndexRange } from 'react-virtualized';
import { logError } from '@/utils/sentry';

export function useGridRect() {
    return useMemo(() => {
        return {
            getColumnCount: (containerWidth: number) => {
                if (containerWidth > 700) {
                    return Math.ceil(containerWidth / 320);
                }

                if (containerWidth > 320) {
                    return 2;
                }

                return 1;
            },
            horizontalGap: 16,
            verticalGap: 8
        };
    }, []);
}

enum StateEvent {
    INIT = 'init',
    START_LOAD = 'startLoad',
    LOADED = 'loaded',
    REFRESH = 'refresh',
    ABORTED = 'aborted',
    LOAD_ERROR = 'loadError'
}

export type GridState = {
    data: any[],
    index: number,
    loading: number,
    error: {
        failedRange: IndexRange,
        originalError: any
    } | undefined,
    event: `${StateEvent}`,
    finished: boolean,
    lastRange: IndexRange | undefined
}

type Actions = {
    setState: (state: ((state: GridState) => Partial<GridState>)) => void
}

const useGridStore = create<GridState & Actions>((set) => ({
    data: [],
    index: 0,
    loading: 0,
    error: undefined,
    event: 'init',
    finished: false,
    lastRange: undefined,
    setState: set
}));

export type GridPagination = {
    loadPart: (range: IndexRange) => Promise<void>,
    refresh: () => void,
    reloadAfterError: () => void
}

export type GridDataLoader = (offset: number, limit: number) => Promise<{
    items: any[],
    total: number
}>;

export function useGridPagination(loader: GridDataLoader): GridPagination {
    const queue = useMemo(() => {
        return new PQueue({ concurrency: 1 });
    }, []);
    const currentNonce = useRef<string | undefined>();
    const setState = useGridStore(state => state.setState);

    const createNonce = () => {
        return uuid();
    };

    const isListFinished = (data: GridState['data'], total: number) => {
        return data.length === 0 || data.length >= total;
    };

    const onStart = (range: IndexRange) => {
        const count = range.stopIndex - range.startIndex + 1;

        setState(state => ({
            loading: count,
            error: undefined,
            index: state.index + count,
            lastRange: range,
            event: 'startLoad'
        }));
    };

    const onResponse = (requestNonce: string, data: GridState['data'], total: number) => {
        if (currentNonce.current === requestNonce) {
            setState(state => {
                const newData = [...state.data, ...data];

                return {
                    loading: 0,
                    data: newData,
                    index: state.index - (state.loading - data.length),
                    finished: isListFinished(newData, total),
                    event: 'loaded'
                };
            });
        } else {
            setState(state => ({
                index: state.index - state.loading,
                loading: 0,
                finished: false,
                event: 'aborted'
            }));
        }
    };

    const onError = (requestNonce: string, range: IndexRange, error: any) => {
        if (currentNonce.current === requestNonce) {
            setState(state => ({
                loading: 0,
                index: state.index - state.loading,
                error: {
                    failedRange: range,
                    originalError: error
                },
                event: 'loadError'
            }));
        } else {
            setState(state => ({
                loading: 0,
                index: state.index - state.loading,
                finished: false,
                event: 'aborted'
            }));
        }
    };

    /**
     * Загрузить предметы со startIndex по stopIndex.
     */
    const loadPart = useCallback(async (range: IndexRange) => {
        const requestNonce = createNonce();

        queue.add(async () => {
            try {
                const state = useGridStore.getState();

                if (state.finished || state.error || !(range.startIndex > state.index)) {
                    return;
                }

                currentNonce.current = requestNonce;

                const countItems = range.stopIndex - range.startIndex + 1;
                const offset = state.index;
                const limit = countItems;

                onStart(range);

                const { items, total } = await loader(offset, limit);

                onResponse(requestNonce, items, total);
            } catch (error) {
                onError(requestNonce, range, error);
                logError(error);
            }
        });
    }, [loader, queue]);

    /**
     * Перезагрузить стейт
     */
    const refresh = useCallback(() => {
        setState(() => ({
            event: 'refresh',
            data: [],
            index: 0,
            loading: 0,
            error: undefined,
            finished: false,
            lastRange: undefined
        }));
    }, [setState]);

    /**
     * Сбросить ошибку и загрузить заново массив, который не удалось получить ранее.
     * Использовать в местах где отображаем ошибку с кнопкой "Попробовать еще раз".
     */
    const reloadAfterError = useCallback(() => {
        const state = useGridStore.getState();

        if (state.error) {
            setState(() => ({
                error: undefined
            }));
            loadPart(state.error.failedRange);
        }
    }, [setState, loadPart]);

    return {
        loadPart,
        refresh,
        reloadAfterError
    };
}

export function useGridState(): GridState {
    return useGridStore(state => ({
        data: state.data,
        index: state.index,
        loading: state.loading,
        error: state.error,
        event: state.event,
        finished: state.finished,
        lastRange: state.lastRange
    }));
}