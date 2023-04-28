import { ReactNode, useEffect, useState } from 'react';
import { CollectionRow } from './Row/CollectionRow';
import { Collection } from '@/states/collection/types';
import { PAGE_SIZE } from '@/config/constants';
import styles from './CollectionTable.module.scss';
import { useCollectionQuery } from '@/states/collection/hooks/useCollectionsQuery';
import { Button } from '@/uikit';

type CollectionTableProps = {
    sort?: string;
    customButtonDown?: ReactNode;
}



// TODO: add more props for proper data fetching
export function CollectionTable({ sort = '', customButtonDown }: CollectionTableProps) {
    const filter = {
        sort
    };

    const viewProps = useCollectionTable(filter);

    return (
        <CollectionTableView
            {...viewProps}
            sort={sort}
            customButtonDown={customButtonDown}
        />
    );
}


function useCollectionTable(filter) {
    const [pageNum, setPageNum] = useState(0);
    const [collectionsData, setCollectionsData] = useState<Collection[]>([]);
    const { collection, isLoading } = useCollectionQuery({
        pageNum,
        filter
    });

    // сбрасываем старницы и коллекции при изменении сортировки
    useEffect(() => {
        setPageNum(0);
        setCollectionsData([]);
    }, [filter.sort]);

    // обновляем коллекции при изменении данных
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
    sort: string;
    customButtonDown?: ReactNode
}

function CollectionTableView({ isFirstLoad, loadNextPage, isLoading, collections, customButtonDown }: CollectionTableViewProps) {


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

            {
                customButtonDown
                    ?
                    customButtonDown
                    :
                    <Button
                        view='secondary'
                        block
                        loading={isLoading}
                        onClick={loadNextPage}
                    >
                        Load More
                    </Button>

            }

        </>
    );
}
