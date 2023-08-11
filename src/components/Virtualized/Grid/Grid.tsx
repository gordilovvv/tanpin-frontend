import { MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { Grid as VirtualizedGrid, GridProps as VirtualizedGridProps, CellMeasurerCache, GridCellProps, OverscanIndicesGetterParams, InfiniteLoaderChildProps, SectionRenderedParams } from 'react-virtualized';
import { ScrollChildProps } from './Scroller';
import { Cell } from './Cell';
import { Rect, RerenderGridCell } from '../types';

function getRowCount(data: any[], columnCount: number) {
    if (data.length === 0) {
        return 20;
    }

    return Math.min(
        Math.max(Math.ceil(data.length / columnCount), 1),
        Infinity
    );
}

function overscanIndicesGetter({ cellCount, overscanCellsCount, startIndex, stopIndex }: OverscanIndicesGetterParams) {
    return {
        overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
        overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount)
    };
}

type GridProps = {
    data: any[],
    rect: Rect,
    cacheRef: MutableRefObject<CellMeasurerCache | null>,
    innerRef: (child: any) => void,
    extraRowCount?: number,
    overscanRowCount: VirtualizedGridProps['overscanRowCount'],
    rerender: RerenderGridCell,
    onRowsRendered: InfiniteLoaderChildProps['onRowsRendered'],
} & ScrollChildProps;

export function Grid({
    data,
    rect,
    cacheRef,
    innerRef,
    extraRowCount = 0,
    overscanRowCount,
    rerender,
    onRowsRendered,
    width,
    height,
    autoHeight,
    isScrolling,
    onScroll,
    scrollTop,
    scrollLeft,
}: GridProps) {
    const gridRef = useRef<VirtualizedGrid>(null);

    const columnCount = rect.getColumnCount(width);
    const columnCountRef = useRef(columnCount);
    const columnWidth = width / columnCount;
    const rowCount = getRowCount(data, columnCount);

    const measurementCache = useMemo(() => {
        return new CellMeasurerCache({
            fixedWidth: true,
            defaultWidth: columnWidth
        });
    }, [columnWidth]);

    // Recompute grid size when columnsCount has been changed
    useEffect(() => {
        if (columnCountRef.current !== columnCount) {
            gridRef.current?.recomputeGridSize();
            columnCountRef.current = columnCount;
        }
    }, [columnCount]);

    // Update parent's cacheRef
    useEffect(() => {
        if (cacheRef) {
            cacheRef.current = measurementCache;
        }
    }, [cacheRef, measurementCache]);

    // Update parent's gridRef
    useEffect(() => {
        if (gridRef) {
            innerRef(gridRef.current);
        }
    }, [gridRef]);

    const cellRerender = useCallback((params: GridCellProps) => {
        const { key, rowIndex, columnIndex, isScrolling, isVisible, parent, style } = params;
        const index = rowIndex * columnCount + columnIndex;
        const item = data[index];
        const cellKey = `${columnCount}-${key}`;

        return (
            <Cell
                index={index}
                key={cellKey}
                item={item}
                rerender={rerender}
                cache={measurementCache}
                rowIndex={rowIndex}
                columnCount={columnCount}
                columnWidth={columnWidth}
                columnIndex={columnIndex}
                horizontalGap={rect.horizontalGap}
                verticalGap={rect.verticalGap}
                isScrolling={isScrolling}
                isVisible={isVisible}
                parent={parent}
                style={style}
            />
        );
    }, [columnCount, columnWidth, data, rerender, measurementCache, rect]);

    const onSectionRendered = useCallback((params: SectionRenderedParams) => {
        const { rowStartIndex, rowStopIndex, columnStartIndex, columnStopIndex } = params;
        const startIndex = rowStartIndex * columnCount + columnStartIndex;
        const stopIndex = rowStopIndex * columnCount + columnStopIndex;

        onRowsRendered({
            startIndex,
            stopIndex
        });
    }, [columnCount, onRowsRendered]);

    return (
        <VirtualizedGrid
            ref={gridRef}
            width={width}
            height={height}
            columnCount={columnCount}
            columnWidth={columnWidth}
            rowCount={rowCount + extraRowCount}
            deferredMeasurementCache={measurementCache}
            rowHeight={measurementCache.rowHeight}
            cellRenderer={cellRerender}
            overscanIndicesGetter={overscanIndicesGetter}
            onSectionRendered={onSectionRendered}
            autoHeight={autoHeight}
            overscanRowCount={overscanRowCount}
            scrollTop={scrollTop}
            scrollLeft={scrollLeft}
            isScrolling={isScrolling}
            onScroll={onScroll}
        />
    );
}