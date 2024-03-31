import { useEffect, useRef } from 'react';
import { InfiniteLoader, InfiniteLoaderProps, InfiniteLoaderChildProps } from 'react-virtualized';
import { ScrollChildProps, Scroller } from './Scroller';
import { ErrorResult } from '@/components/Explorer';
import { GridPagination, GridState } from './hooks';
import { useTranslation } from '@/localization';

export type LoaderChildProps = ScrollChildProps & {
    onRowsRendered: InfiniteLoaderChildProps['onRowsRendered'],
    registerChild: InfiniteLoaderChildProps['registerChild'],
}

type LoaderProps = {
    state: GridState,
    pagination: GridPagination,
    isRowLoaded: InfiniteLoaderProps['isRowLoaded'],
    loadMoreRows: InfiniteLoaderProps['loadMoreRows'],
    minimumBatchSize: InfiniteLoaderProps['minimumBatchSize'],
    rowCount: InfiniteLoaderProps['rowCount'],
    threshold: InfiniteLoaderProps['threshold'],
    children: (params: LoaderChildProps) => JSX.Element,
    empty: () => JSX.Element,
    rejected?: () => JSX.Element
}

export function Loader({
    state,
    pagination,
    isRowLoaded,
    loadMoreRows,
    minimumBatchSize,
    rowCount,
    threshold,
    children,
    empty,
    rejected
}: LoaderProps) {
    const { t } = useTranslation();
    const infinityLoader = useRef<InfiniteLoader>(null);

    useEffect(() => {
        if (state.event === 'refresh') {
            infinityLoader.current?.resetLoadMoreRowsCache(true);
        }
    }, [state.event]);

    // Ничего не найдено
    if (state.finished && !state.data.length) {
        return (
            <>{empty()}</>
        );
    }

    // Ошибка и ничего не найдено
    if (state.error && !state.data.length) {
        if (rejected) {
            return <>{rejected()}</>;
        } else {
            return (<ErrorResult
                title={t('An error occurred')}
                text={t('There was an error while fetching')}
                onRetry={pagination.reloadAfterError}
            />);
        }
    }

    return (
        <InfiniteLoader
            ref={infinityLoader}
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            minimumBatchSize={minimumBatchSize}
            rowCount={rowCount}
            threshold={threshold}
        >
            {({ onRowsRendered, registerChild }) => (
                <Scroller>
                    {(childProps) => children({
                        ...childProps,
                        onRowsRendered,
                        registerChild
                    })}
                </Scroller>
            )}
        </InfiniteLoader>
    );
}