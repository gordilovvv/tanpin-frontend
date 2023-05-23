import { ReactNode } from 'react';
import {
    WindowScroller,
    WindowScrollerChildProps,
    InfiniteLoader,
    InfiniteLoaderProps,
    InfiniteLoaderChildProps,
    AutoSizer,
} from 'react-virtualized';

type ScrollerProps = {
    isRowLoaded: InfiniteLoaderProps['isRowLoaded'],
    loadMoreRows: InfiniteLoaderProps['loadMoreRows'],
    minimumBatchSize: number,
    rowCount: number,
    threshold?: number,
    registerLoaderRef: (loaderRef: any) => void,
    children: (params: {
        width: number
        height: number
        isScrolling: boolean
        scrollTop: number,
        scrollLeft: number
        registerChild: InfiniteLoaderChildProps['registerChild']
        onScroll: WindowScrollerChildProps['onChildScroll']
        onRowsRendered: InfiniteLoaderChildProps['onRowsRendered']
    }) => ReactNode
}

export function InfinityScroller({
    isRowLoaded,
    loadMoreRows,
    minimumBatchSize,
    rowCount,
    threshold,
    registerLoaderRef,
    children
}: ScrollerProps) {
    return (
        // @ts-ignore
        <InfiniteLoader
            ref={registerLoaderRef}
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
            threshold={threshold}
            minimumBatchSize={minimumBatchSize}
        >
            {({ onRowsRendered, registerChild }) => (
                // @ts-ignore
                <WindowScroller>
                    {({ height, scrollTop, scrollLeft, isScrolling, onChildScroll }) => (
                        // @ts-ignore
                        <AutoSizer disableHeight>
                            {({ width }) => children({
                                width,
                                height,
                                scrollLeft,
                                scrollTop,
                                isScrolling,
                                registerChild,
                                onScroll: onChildScroll,
                                onRowsRendered
                            })}
                        </AutoSizer>
                    )}
                </WindowScroller>
            )}
        </InfiniteLoader>
    );
}