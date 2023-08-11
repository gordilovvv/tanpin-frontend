import { useCallback, useEffect, useRef } from 'react';
import { CellMeasurerCache, GridProps, InfiniteLoaderProps } from 'react-virtualized';
import { Grid } from './Grid';
import { Loader } from './Loader';
import { GridDataLoader, useGridPagination, useGridState } from './hooks';
import { Rect, RerenderGridCell } from '../types';
import styles from './VirtualizedGrid.module.scss';

type VirtualizedGridProps<T> = {
    loadItems: GridDataLoader,
    renderItem: (props: { data: T, loading: boolean, index: number, measure: () => void }) => JSX.Element,
    /** Empty component */
    empty: () => JSX.Element
    /** Error component */
    rejected?: () => JSX.Element
    /** Отступы + кол-во колонок */
    rect: Rect,
    /** Threshold at which to pre-fetch data. A threshold X means that data will start loading when a user scrolls within X rows. This value defaults to 15. */
    threshold?: InfiniteLoaderProps['threshold'],
    /** Number of rows to render above/below the visible section of the grid. These rows can help for smoother scrolling on touch devices or browsers that send scroll events infrequently. */
    overscanRowCount?: GridProps['overscanRowCount'],
    /** Minimum number of rows to be loaded at a time. This property can be used to batch requests to reduce HTTP requests. */
    minimumBatchSize?: InfiniteLoaderProps['minimumBatchSize']
}

export function VirtualizedGrid<T>({
    loadItems,
    renderItem,
    empty,
    rejected,
    rect,
    threshold,
    overscanRowCount,
    minimumBatchSize
}: VirtualizedGridProps<T>) {
    const state = useGridState();
    const pagination = useGridPagination(loadItems);
    const cacheRef = useRef<CellMeasurerCache>(null);
    const isMounted = useRef<boolean>(false);

    useEffect(() => {
        if (state.event === 'refresh') {
            cacheRef.current?.clearAll();
        }
    }, [state.event]);

    useEffect(() => {
        isMounted.current = true;
    }, []);

    // Когда обновилась функция загрузки - сбрасываем пагинацию
    useEffect(() => {
        if (isMounted.current && state.event !== 'init') {
            pagination.refresh();
        }
    }, [loadItems]);

    const isRowLoaded = useCallback<InfiniteLoaderProps['isRowLoaded']>(({ index }) => {
        return index <= state.index;
    }, [state.index]);

    const rerenderItem: RerenderGridCell = useCallback(({ item, index, measure }) => {
        const empty = state.data.length === 0;
        const fetching = state.loading > 0;
        const isLoading = !(!empty && !fetching) && index >= state.data.length;

        return renderItem({
            data: item,
            loading: isLoading,
            index,
            measure
        });
    }, [state.data, state.loading, renderItem]);

    return (
        <div className={styles.wrap}>
            <Loader
                state={state}
                pagination={pagination}
                empty={empty}
                rejected={rejected}
                threshold={threshold}
                rowCount={Infinity}
                isRowLoaded={isRowLoaded}
                loadMoreRows={pagination.loadPart}
                minimumBatchSize={minimumBatchSize}
            >
                {({ registerChild, ...loaderChildProps }) => (
                    <Grid
                        data={state.data}
                        rect={rect}
                        rerender={rerenderItem}
                        cacheRef={cacheRef}
                        innerRef={registerChild}
                        extraRowCount={state.loading && state.data.length > 0 ? state.loading : 0}
                        overscanRowCount={overscanRowCount}
                        {...loaderChildProps}
                    />
                )}
            </Loader>
        </div>
    );
}