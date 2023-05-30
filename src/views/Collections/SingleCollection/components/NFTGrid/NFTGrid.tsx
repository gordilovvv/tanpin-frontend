import { memo, useCallback } from 'react';
import { NftCard, NftCardSkeleton } from '@/components/Nft';
import { VirtualizedGrid } from '@/components/Virtualized/Grid/VirtualizedGrid';
import { fetchNFTList } from '@/states/nft/fetch/fetchNFTList';
import { FilterState } from '@/states/collection/filterStore';
import styles from './NFTGrid.module.scss';

type NFTGridProps = {
    collectionID?: string,
    filter: FilterState,
    empty: () => JSX.Element
}

// TODO: грид выкидывает только id, а по нему уже получаем из хеш мапа объект
export const NFTGrid = memo(({ collectionID, filter, empty }: NFTGridProps) => {
    const fetchList = useCallback(async (offset: number, limit: number) => {
        return fetchNFTList({
            collectionID,
            limit,
            offset,
            filter
        });
    }, [collectionID, filter]);

    const renderGridItem = useCallback(({ data, loading }) => {
        if (loading)
            return (<NftCardSkeleton />);

        // TODO: game
        return (
            <NftCard
                nft={data}
                parentGame={{
                    ID: '1',
                    name: 'Game'
                }}
            />
        );
    }, []);

    return (
        <div className={styles.list}>
            <VirtualizedGrid
                renderItem={renderGridItem}
                renderEmpty={empty}
                loadItems={fetchList}
                minimumBatchSize={30}
            />
        </div>
    );
});

NFTGrid.displayName = 'NFTGrid';