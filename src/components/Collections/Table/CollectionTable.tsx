import { memo } from 'react';
import { Button } from '@/uikit';
import { CollectionRow, CollectionRowSkeleton } from './Row/CollectionRow';
import { CollectionQueryBody } from '@/states/collection/types';
import { useCollectionsQuery } from '@/states/collection/hooks/useCollectionsQuery';
import { PAGE_SIZE } from '@/config/constants';
import styles from './CollectionTable.module.scss';


type CollectionTableProps = {
    filter?: CollectionQueryBody['filter']
    hasMoreButton?: boolean
};

const HEADER_ITEMS = [
    '#',
    'Collections',
    'Floor Price',
    'Items',
    'Sales (7D)',
    'Volume',
    '1D Change',
];

export const CollectionTable = memo(({ filter, hasMoreButton }: CollectionTableProps) => {
    const { collections, isLoading, loadMore, isFirstLoading, hasLoadMore } = useCollectionsQuery({
        filter,
    });

    const collectionsLoaders = [...Array(PAGE_SIZE).keys()];

    return (
        <div className={styles.table}>
            <div className={styles.head}>
                {HEADER_ITEMS.map((item, idx) => {
                    return (
                        <div
                            className={styles.headItem}
                            key={idx}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>

            {isFirstLoading && collections ? (
                <div className={styles.body}>
                    {collectionsLoaders.map((index) => (
                        <CollectionRowSkeleton
                            key={index}
                            index={index}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.body}>
                    {collections.map((item, index) => (
                        <CollectionRow
                            key={item.ID}
                            index={index}
                            collection={item}
                        />
                    ))}
                </div>
            )}


            <div className={styles.footer}>

                {hasLoadMore && !isFirstLoading && hasMoreButton && (
                    <Button
                        view="secondary"
                        block
                        loading={isLoading}
                        onClick={loadMore}
                    >
                        Load More
                    </Button>
                )}
            </div>

        </div>
    );
});

CollectionTable.displayName = 'CollectionTable';
