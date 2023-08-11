import { CSSProperties } from 'react';

export type Rect = {
    getColumnCount: (containerWidth: number) => number,
    horizontalGap: number,
    verticalGap: number
}

export type RerenderGridCell = (params: {
    item: any,
    index: number,
    width: CSSProperties['width'],
    measure: () => void
}) => JSX.Element