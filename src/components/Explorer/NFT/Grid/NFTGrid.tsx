import { memo, useCallback } from 'react';
import { NftCard, NftCardSkeleton } from '@/components/Nft';
import { VirtualizedGrid } from '@/components/Virtualized/Grid/VirtualizedGrid';
import { useAccount } from '@/states/user/hooks/useAccount';
import { TokensFilterState } from '@/states/explorer/TokensFilterStore';
import { fetchTokensList } from '@/states/explorer/fetch/fetchTokensList';
import { NFTExplorerCategory } from '@/states/explorer/types';
import styles from './NFTGrid.module.scss';

type NFTGridProps = {
    category: `${NFTExplorerCategory}`,
    collectionID?: string
    ownerAddress?: string,
    filter: TokensFilterState
    empty: () => JSX.Element,
    rejected?: () => JSX.Element
}

// TODO: грид выкидывает только id, а по нему уже получаем из хеш мапа объект
export const NFTGrid = memo(({ category, collectionID, ownerAddress, filter, empty, rejected }: NFTGridProps) => {
    const { address } = useAccount();
    const ownerUserAddress = category === 'ownership' || category === 'ownershipSale'
        ? address
        : undefined;

    const fetchList = useCallback(async (offset: number, limit: number) => {
        return fetchTokensList({
            collectionID,
            ownerAddress,
            limit,
            offset,
            filter
        });
    }, [collectionID, ownerAddress, filter.hash]);

    const renderCard = useCallback(({ data, loading }) => {
        if (loading)
            return (<NftCardSkeleton />);

        if (data)
            return (<NftCard
                nft={data}
                userAddress={ownerUserAddress}
            />);

        return <></>;
    }, [ownerUserAddress]);

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