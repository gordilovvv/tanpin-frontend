import { ReactNode } from 'react';
import styles from './ColletctionTable.module.scss';
import { CollectionTableRow } from './components/Row/CollectionTableRow';
import './_tableRow.scss';

type ColletctionTable = {
    children: ReactNode
}

const HEADER_ITEMS = ['#', 'Collections', 'Floor Price', 'Items', 'Owners', 'Volume', '1D Change'];


export function ColletctionTable({ children }: ColletctionTable) {
    return (
        <>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    {
                        HEADER_ITEMS.map((item, idx) => {
                            return (<div
                                className={styles.tableHeaderItem}
                                key={idx}
                            >
                                {item}
                            </div>);
                        })
                    }

                </div>

                {
                    ((new Array(10)).fill(1)).map((el, idx) => {
                        return (<CollectionTableRow />);

                    })
                }

            </div>

            {children}
        </>

    );
}