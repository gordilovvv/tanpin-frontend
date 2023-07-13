import { CSSProperties } from 'react';

export type RerenderGridCell = (params: {
    item: any,
    index: number,
    width: CSSProperties['width'],
    measure: () => void
}) => JSX.Element