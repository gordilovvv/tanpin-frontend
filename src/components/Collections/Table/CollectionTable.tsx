import { memo } from 'react';
import { Button } from '@/uikit';
import { CollectionRow, CollectionRowSkeleton } from './Row/CollectionRow';
import { EmptyResult } from '@/components/Explorer';
import { CollectionsFilter } from '@/states/collection/types';
import { useCollections } from '@/states/collection/hooks/useCollections';
import { times } from 'lodash';
import styles from './CollectionTable.module.scss';

type CollectionTableProps = {
    filter: CollectionsFilter
};

export const CollectionTable = memo(({ filter }: CollectionTableProps) => {
    const { collections, isLoading, isFinished, loadMore } = useCollections(filter);

    const isFirstLoading = collections.length === 0 && isLoading;
    const showMoreButton = !isFinished && !isFirstLoading && !!collections.length;

    const headColumns = [
        '#',
        'Collections',
        'Floor Price',
        'Items',
        'Sales',
        'Volume (7D)',
        // '1D Change',
    ];

    const renderBody = () => {
        if (isFirstLoading) {
            return (
                <div className={styles.body}>
                    {times(7).map((index) => (
                        <CollectionRowSkeleton
                            key={index}
                            index={index}
                        />
                    ))}
                </div>
            );
        }

        if (!collections.length) {
            return (<div className={styles.empty}>
                <EmptyResult
                    title='Nothing found'
                    text="We couldn't find any collections"
                />
            </div>);
        }

        return (
            <div className={styles.body}>
                {collections.map((item, index) => (
                    <CollectionRow
                        key={item.ID}
                        index={index}
                        collection={item}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={styles.table}>
            <div className={styles.head}>
                {headColumns.map((item, idx) => {
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

            {renderBody()}

            <div className={styles.footer}>
                {showMoreButton && (
                    <Button
                        view='secondary'
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
