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
    empty: () => JSX.Element,
    rejected?: () => JSX.Element
}

// TODO: грид выкидывает только id, а по нему уже получаем из хеш мапа объект
export const NFTGrid = memo(({ collectionID, ownerAddress, filter, empty, rejected }: NFTGridProps) => {
    const fetchList = useCallback(async (offset: number, limit: number) => {
        return fetchTokensList({
            collectionID,
            ownerAddress,
            limit,
            offset,
            filter
        });
    }, [collectionID, ownerAddress, filter]);

    const renderCard = useCallback(({ data, loading }) => {
        if (loading)
            return (<NftCardSkeleton />);

        if (data)
            return (<NftCard nft={data} />);

        return <></>;
    }, []);

    return (
        <div className={styles.grid}>
            <div className={styles.content}>
                <VirtualizedGrid
                    loadItems={fetchList}
                    renderItem={renderCard}
                    empty={empty}
                    rejected={rejected}
                    minimumBatchSize={30}
                />
            </div>
        </div>
    );
});

NFTGrid.displayName = 'NFTGrid';