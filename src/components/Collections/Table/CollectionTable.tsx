import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Button } from '@/uikit';
import { CollectionRow, CollectionRowSkeleton } from './Row/CollectionRow';
import { CollectionQueryBody } from '@/states/collection/types';
import { useCollectionsQuery } from '@/states/collection/hooks/useCollectionsQuery';
import { PAGE_SIZE } from '@/config/constants';
import styles from './CollectionTable.module.scss';

type CollectionTableProps = {
    filter?: CollectionQueryBody['filter']
    footerButton?: ReactNode
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

export function CollectionTable({ filter, footerButton, hasMoreButton }: CollectionTableProps) {
    //TODO: limit, offset
    const [pageNum, setPageNum] = useState(1);
    const { collections, page: loadedPage, pageCount, isLoading: isQueryLoading } = useCollectionsQuery({
        pageNum,
        filter,
    });


    const isLoading = isQueryLoading || !collections.length;
    const isLoadingMore = isQueryLoading && pageNum > 0 && !!collections?.length;

    const hasMorePages = useMemo(() => {
        if (pageNum === 1 || !pageCount) {
            return true;
        }

        if (loadedPage && pageCount) {
            return loadedPage < pageCount;
        }

        return pageNum + 1 <= pageCount;
    }, [pageNum, loadedPage, pageCount]);

    const hasFooter = footerButton || hasMoreButton || hasMorePages;
    // const collectionsLoaders = isLoading ? [...Array(PAGE_SIZE).keys()] : []; - поменял это на строку ниже 
    const collectionsLoaders = [...Array(PAGE_SIZE).keys()];

    useEffect(() => {
        setPageNum(1);
    }, [filter?.sort, filter?.search]);

    const loadMore = () => {
        setPageNum((num) => num + 1);
    };

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

            {isLoading ? (
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

            {hasFooter && (
                <div className={styles.footer}>
                    {footerButton}

                    {hasMoreButton && hasMorePages && (
                        <Button
                            view="secondary"
                            block
                            loading={isLoadingMore}
                            onClick={loadMore}
                        >
                            Load More
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
