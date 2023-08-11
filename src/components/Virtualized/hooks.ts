import { useMemo } from 'react';
import { Rect } from './types';

export function useGridRect(): Rect {
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

export function useTableRect(verticalGap: number): Rect {
    return useMemo(() => {
        return {
            getColumnCount: () => 1,
            horizontalGap: 0,
            verticalGap
        };
    }, [verticalGap]);
}