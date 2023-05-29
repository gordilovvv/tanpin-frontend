import { memo, useCallback } from 'react';
import { NftCard, NftCardSkeleton } from '@/components/Nft';
import { VirtualizedGrid } from '@/components/Virtualized/Grid/VirtualizedGrid';
import { fetchNFTList } from '@/states/nft/fetch/fetchNFTList';
import { NFTListFilter } from '@/states/nft/types';
import styles from './NFTGrid.module.scss';


type NFTGridProps = {
    collectionID?: string,
    filter: NFTListFilter,
    empty: () => JSX.Element
}

// TODO: грид выкидывает только id, а по нему уже получаем из хеш мапа объект
export const NFTGrid = memo(({ collectionID, filter }: NFTGridProps) => {
    const fetchList = useCallback(async (offset: number, limit: number) => {
        return fetchNFTList({
            collectionID,
            limit,
            offset,
            filter
        });
    }, []);

    const renderGridItem = useCallback(({ data, loading }) => {
        if (loading)
            return (<NftCardSkeleton />);

        // TODO: collection
        return (
            <NftCard
                nft={data}
                collectionID={'20'}
                collectionName={'Cars Drop 2022'}
            />
        );
    }, []);

    return (
        <div className={styles.list}>
            <VirtualizedGrid
                renderItem={renderGridItem}
                loadItems={fetchList}
                minimumBatchSize={30}
            />
        </div>
    );
});

NFTGrid.displayName = 'NFTGrid';