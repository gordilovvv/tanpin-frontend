import { CSSProperties } from 'react';

export type RerenderCellHandler<T> = (params: {
    item: T,
    index: number,
    width: CSSProperties['width'],
    measure: () => void
}) => JSX.Element