import { ReactNode } from 'react';
import { CollectionRow } from './Row/CollectionRow';
import { Collection } from '@/states/collection/types';
import { PAGE_SIZE } from '@/config/constants';
import styles from './CollectionTable.module.scss';

type CollectionTableProps = {
    items: Collection[]
    button: ReactNode,
    loading?: boolean
}

const HEADER_ITEMS = ['#', 'Collections', 'Floor Price', 'Items', 'Sales (7D)', 'Volume', '1D Change'];

export function CollectionTable({ items, button, loading }: CollectionTableProps) {
    const isFirstLoading = items.length === 0 && loading;

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
                    {isFirstLoading
                        ? [...Array(PAGE_SIZE).keys()].map(i => <CollectionRow
                            key={i}
                            index={i}
                        />) :
                        items.map((item, index) => <CollectionRow
                            key={item.ID}
                            index={index}
                            collection={item}
                        />)
                    }
                </div>
            </div>

            {button}
        </>
    );
}
