import { memo, useCallback } from 'react';
import { NftCard, NftCardSkeleton } from '@/components/Nft';
import { VirtualizedGrid } from '@/components/Virtualized/Grid/VirtualizedGrid';
import { TokensFilterState } from '@/states/explorer/TokensFilterStore';
import { fetchTokensList } from '@/states/explorer/fetch/fetchTokensList';
import styles from './NFTGrid.module.scss';

type NFTGridProps = {
    collectionID?: string
    ownerAddress?: string,
    filter: TokensFilterState
    empty: () => JSX.Element
}

// TODO: грид выкидывает только id, а по нему уже получаем из хеш мапа объект
export const NFTGrid = memo(({ collectionID, ownerAddress, filter, empty }: NFTGridProps) => {
    const fetchList = useCallback(async (offset: number, limit: number) => {
        return fetchTokensList({
            collectionID,
            ownerAddress,
            limit,
            offset,
            filter
        });
    }, [collectionID, ownerAddress, filter]);

    const renderGridItem = useCallback(({ data, loading }) => {
        if (loading)
            return (<NftCardSkeleton />);

        return (<NftCard nft={data} />);
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