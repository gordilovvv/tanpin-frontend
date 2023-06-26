import { useCallback, useMemo, useRef } from 'react';
import { CellMeasurerCache, InfiniteLoader, InfiniteLoaderProps } from 'react-virtualized';
import { GridInner } from './Inner/GridInner';
import { InfinityScroller } from './Scroller/InfinityScroller';
import { RerenderCellHandler } from '../types';
import { useVirtualizedGridState } from '../hooks';

type VirtualizedGridProps<T> = {
    renderItem: (props: { data: T, loading: boolean, index: number, measure: () => void }) => JSX.Element
    renderEmpty: () => JSX.Element,
    loadItems: (offset: number, limit: number) => Promise<any>
    minimumBatchSize: number
}

// TODO:
// 1. При первом изменении фильтра не обновляется грид
// 2. При подгрузке может остаться скелетон
export function VirtualizedGrid<T>({
    loadItems,
    renderEmpty,
    renderItem,
    minimumBatchSize
}: VirtualizedGridProps<T>) {
    const state = useVirtualizedGridState(loadItems);

    const rowCount = Infinity;
    const columnCount = useRef<number | null>(null);

    const cellCache = useRef<CellMeasurerCache | null>(null);
    const loaderRef = useRef<InfiniteLoader | null>(null);

    const rect = useMemo(() => {
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

    const isRowLoaded = useCallback<InfiniteLoaderProps['isRowLoaded']>(({ index }) => {
        return index <= state.index;
    }, [state.index]);

    const onColumnCountChange = useCallback((count: number) => {
        if (columnCount.current !== count) {
            columnCount.current = count;

            cellCache.current?.clearAll();
            loaderRef.current?.resetLoadMoreRowsCache(true);
        }
    }, [columnCount, cellCache, loaderRef]);

    const rerenderItem: RerenderCellHandler<T> = useCallback(({ item, index, measure }) => {
        const empty = state.items.length === 0;
        const loading = state.loading > 0 && index >= state.items.length;

        return renderItem({
            data: item,
            loading: empty && loading || !item,
            index,
            measure
        });
    }, [state.items, state.loading, renderItem]);

    const registerLoaderRef = useCallback((loader: InfiniteLoader) => {
        loaderRef.current = loader;
    }, [loaderRef]);

    if (state.finished && !state.items.length) {
        return renderEmpty();
    }

    return (
        <InfinityScroller
            registerLoaderRef={registerLoaderRef}
            rowCount={rowCount}
            isRowLoaded={isRowLoaded}
            loadMoreRows={state.loadItems}
            minimumBatchSize={minimumBatchSize}
        >
            {({
                width,
                height,
                scrollTop,
                scrollLeft,
                isScrolling,
                onScroll,
                registerChild,
                onRowsRendered
            }) => (
                <GridInner
                    items={state.items}
                    rect={rect}
                    width={width}
                    height={height}
                    extraRowCount={state.loading && state.items.length > 0 ? state.loading : 0}
                    isScrolling={isScrolling}
                    cellCache={cellCache}
                    scrollTop={scrollTop}
                    scrollLeft={scrollLeft}
                    onScroll={onScroll}
                    innerRef={registerChild}
                    rerenderCell={rerenderItem}
                    onRowsRerender={onRowsRendered}
                    onColumnCountChange={onColumnCountChange}
                />
            )}
        </InfinityScroller>
    );
}