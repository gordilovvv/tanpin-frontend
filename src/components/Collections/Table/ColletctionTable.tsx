import { ReactNode } from 'react';
import styles from './ColletctionTable.module.scss';
import './_tableRow.scss';

type CollectionTable = {
    bottom: ReactNode
    children: ReactNode
}

const HEADER_ITEMS = ['#', 'Collections', 'Floor Price', 'Items', 'Owners', 'Volume', '1D Change'];

export function CollectionTable({ children, bottom }: CollectionTable) {
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

                {children}
            </div>

            {bottom}
        </>

    );
}
