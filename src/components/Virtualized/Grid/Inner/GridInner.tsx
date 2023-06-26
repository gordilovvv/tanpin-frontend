import { MutableRefObject, useCallback, useEffect, useMemo } from 'react';
import {
    Grid,
    GridProps,
    GridCellProps,
    SectionRenderedParams,
    OverscanIndicesGetterParams,
    CellMeasurerCache,
    WindowScrollerChildProps,
    InfiniteLoaderChildProps
} from 'react-virtualized';
import { GridCell } from '../../Cell/GridCell';
import { RerenderCellHandler } from '../../types';

/**
 * This is an advanced property. This function is responsible for calculating the number of cells to overscan before and after a specified range. By default, React Virtualized optimizes the number of cells to overscan based on scroll direction. If you'd like to customize this behavior, you may want to fork the defaultOverscanIndicesGetter function.
 */
function overscanIndicesGetter({ cellCount, overscanCellsCount, startIndex, stopIndex }: OverscanIndicesGetterParams) {
    return {
        overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
        overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount)
    };
}

type GridInnerProps = {
    items: any[]
    width: number
    height: number
    extraRowCount: number
    rect: {
        getColumnCount: (containerWidth: number) => number,
        horizontalGap: number,
        verticalGap: number
    }
    cellCache: MutableRefObject<CellMeasurerCache | null>
    scrollTop: GridProps['scrollTop']
    scrollLeft: GridProps['scrollLeft']
    isScrolling: WindowScrollerChildProps['isScrolling']
    onScroll: GridProps['onScroll'],
    innerRef: (registeredGrid: any) => void
    rerenderCell: RerenderCellHandler<any>
    onRowsRerender: InfiniteLoaderChildProps['onRowsRendered']
    onColumnCountChange: (count: number) => void
};

export function GridInner({
    items,
    width,
    height,
    rect,
    cellCache,
    extraRowCount,
    scrollTop,
    scrollLeft,
    isScrolling,
    onScroll,
    innerRef,
    rerenderCell,
    onRowsRerender,
    onColumnCountChange
}: GridInnerProps) {
    const columnCount = rect.getColumnCount(width);
    const columnWidth = width / columnCount;

    const rowCount = Math.min(
        0 === items.length
            ? 20
            : Math.max(Math.ceil(items.length / columnCount), 1),
        Infinity
    );

    const cellCacheMemo = useMemo(() => {
        return new CellMeasurerCache({
            fixedWidth: true,
            defaultWidth: columnWidth
        });
    }, [columnWidth]);

    // Trigger column count
    useEffect(() => {
        onColumnCountChange(columnCount);
    }, [columnCount, onColumnCountChange]);

    // Save cellCache to parent ref
    useEffect(() => {
        cellCache.current = cellCacheMemo;
    }, [cellCache, cellCacheMemo]);

    const cellRerender = useCallback(({ key: cellKey, rowIndex, columnIndex, ...props }: GridCellProps) => {
        const key = `${cellKey}-${columnCount}`;
        const index = rowIndex * columnCount + columnIndex;
        const item = items[index];

        return (
            <GridCell
                item={item}
                key={key}
                cache={cellCacheMemo}
                columnCount={columnCount}
                columnWidth={columnWidth}
                rowIndex={rowIndex}
                rerender={rerenderCell}
                columnIndex={columnIndex}
                horizontalGap={rect.horizontalGap}
                verticalGap={rect.verticalGap}
                index={index}
                {...props}
            />
        );
    }, [items, cellCacheMemo, rerenderCell, columnCount, columnWidth, rect]);

    const onSectionRendered = useCallback(({ rowStartIndex, rowStopIndex, columnStartIndex, columnStopIndex }: SectionRenderedParams) => {
        const startIndex = rowStartIndex * columnCount + columnStartIndex;
        const stopIndex = rowStopIndex * columnCount + columnStopIndex;

        onRowsRerender({
            startIndex,
            stopIndex
        });
    }, [columnCount, onRowsRerender]);

    return (
        // @ts-ignore
        <Grid
            ref={innerRef}
            width={width}
            height={height}
            autoHeight={true}
            columnCount={columnCount}
            columnWidth={columnWidth}
            scrollTop={scrollTop}
            scrollLeft={scrollLeft}
            isScrolling={isScrolling}
            onScroll={onScroll}
            deferredMeasurementCache={cellCacheMemo}
            rowCount={rowCount + extraRowCount}
            rowHeight={cellCacheMemo.rowHeight}
            cellRenderer={cellRerender}
            onSectionRendered={onSectionRendered}
            overscanIndicesGetter={overscanIndicesGetter}
        />
    );
}