import { CSSProperties, memo } from 'react';
import { CellMeasurer, CellMeasurerCache, GridCellProps } from 'react-virtualized';
import { RerenderGridCell } from '../types';

type CellProps = {
    item: any,
    index: number,
    columnWidth: number
    columnCount: number
    verticalGap: number
    horizontalGap: number
    cache: CellMeasurerCache
    rerender: RerenderGridCell
} & GridCellProps;

export const Cell = memo(({
    item,
    index,
    rowIndex,
    parent,
    cache,
    columnWidth,
    columnCount,
    columnIndex,
    style,
    verticalGap,
    horizontalGap,
    rerender
}: CellProps) => {
    const gridPosition = (): CSSProperties => {
        if (columnCount > 1) {
            const left = columnIndex * columnWidth;

            return {
                position: 'absolute',
                width: columnWidth - horizontalGap + horizontalGap / columnCount,
                height: style.height,
                top: style.top,
                left: 0 === columnIndex ? 0 : left + columnIndex * horizontalGap / columnCount - 1,
                paddingBottom: verticalGap,
                paddingTop: verticalGap
            };
        }

        return {
            position: 'absolute',
            width: columnWidth,
            height: style.height,
            top: style.top,
            left: 0,
            paddingBottom: verticalGap,
            paddingTop: verticalGap
        };
    };

    const position = gridPosition();

    return (
        <CellMeasurer
            cache={cache}
            parent={parent}
            columnIndex={columnIndex}
            rowIndex={rowIndex}
        >
            {({ registerChild, measure }) => <div
                style={gridPosition()}
                ref={registerChild as any}
            >
                {rerender({
                    item,
                    index,
                    width: position.width,
                    measure
                })}
            </div>}
        </CellMeasurer>
    );
});

Cell.displayName = 'Cell';