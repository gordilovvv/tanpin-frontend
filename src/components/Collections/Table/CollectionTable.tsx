import { useEffect, useState } from 'react';
import { CollectionRow } from './Row/CollectionRow';
import { Collection } from '@/states/collection/types';
import { PAGE_SIZE } from '@/config/constants';
import styles from './CollectionTable.module.scss';
import { useCollectionQuery } from '@/states/collection/hooks/useCollectionsQuery';
import { Button } from '@/uikit';

// TODO: add more props for proper data fetching
export function CollectionTable() {
    const viewProps = useCollectionTable();

    return (
        <CollectionTableView {...viewProps} />
    );
}

function useCollectionTable() {
    const [pageNum, setPageNum] = useState(0);
    const [collectionsData, setCollectionsData] = useState<Collection[]>([]);
    const { collection, isLoading } = useCollectionQuery({ pageNum });

    // TODO: use SWR's callbacks instead of useEffect
    useEffect(() => {
        if (collection === undefined) {
            return;
        }
        setCollectionsData(prev => [...prev, ...collection.collections]);
    }, [collection, setCollectionsData]);

    function loadNextPage() {
        setPageNum(pageNum + 1);
    }

    const isFirstLoad = pageNum === 0 && isLoading;
    return {
        collections: collectionsData,
        loadNextPage,
        isFirstLoad,
        isLoading,
    };
}

const HEADER_ITEMS = ['#', 'Collections', 'Floor Price', 'Items', 'Sales (7D)', 'Volume', '1D Change'];

type CollectionTableViewProps = {
    collections: Collection[]
    isFirstLoad: boolean
    isLoading: boolean
    loadNextPage: () => void
}

function CollectionTableView({ isFirstLoad, loadNextPage, isLoading, collections }: CollectionTableViewProps) {
    return (
        <>
            <div className={styles.table}>
                <div className={styles.head}>
                    {
                        HEADER_ITEMS.map((item, idx) => {
                            return (<div
                                className={styles.headItem}
                                key={idx}
                            >
                                {item}
                            </div>);
                        })
                    }
                </div>

                <div className={styles.body}>
                    {isFirstLoad
                        ? [...Array(PAGE_SIZE).keys()].map(i => <CollectionRow
                            key={i}
                            index={i}
                        />) :
                        collections.map((item, index) => <CollectionRow
                            key={item.ID}
                            index={index}
                            collection={item}
                        />)
                    }
                </div>
            </div>

            <Button
                view='secondary'
                block
                loading={isLoading}
                onClick={loadNextPage}
            >
                Load More
            </Button>
        </>
    );
}
