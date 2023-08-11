import { memo, useCallback } from 'react';
import { VirtualizedGrid, useTableRect } from '@/components/Virtualized';
import { CollectionRow, CollectionRowSkeleton } from '@/components/Collections';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { fetchCollectionsList } from '@/states/explorer/fetch/fetchCollectionsList';
import { CollectionsFilterState } from '@/states/explorer/CollectionsFilterStore';
import styles from './CollectionsList.module.scss';

type CollectionsListProps = {
    filter: CollectionsFilterState,
    empty: () => JSX.Element,
    rejected?: () => JSX.Element
}

export const CollectionsList = memo(({ filter, empty, rejected }: CollectionsListProps) => {
    const isMobile = useMediaQuery('(max-width: 767px)');

    const gap = isMobile ? 8 : 0;
    const rect = useTableRect(gap);

    const fetchList = useCallback(async (offset: number, limit: number) => {
        return fetchCollectionsList({
            limit,
            offset,
            filter
        });
    }, [filter]);

    const renderRow = useCallback(({ data, loading, index }) => {
        if (loading)
            return (<CollectionRowSkeleton index={index} />);

        if (data)
            return (<CollectionRow
                collection={data}
                index={index}
            />);

        return <></>;
    }, []);

    return (
        <div className={styles.list}>
            <div className={styles.content}>
                <VirtualizedGrid
                    loadItems={fetchList}
                    renderItem={renderRow}
                    empty={empty}
                    rejected={rejected}
                    rect={rect}
                    minimumBatchSize={20}
                />
            </div>
        </div>
    );
});

CollectionsList.displayName = 'CollectionsList';