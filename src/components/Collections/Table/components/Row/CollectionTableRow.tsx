import { CollectionLogo } from '@/components/Collections';
import styles from './CollectionTableRow.module.scss';
import classNames from 'classnames';


type CollectionTableRowProps = {
    title: string;
    description: string;
    imageURL: string;
};

export function CollectionTableRow({ title, description, imageURL }: CollectionTableRowProps) {
    return (

        <div
            className={styles.tableRow}
        >
            <div className={classNames(styles.tableRowItem, styles.tableRowCounter)}>1</div>

            <div className={classNames(styles.tableRowItem, styles.tableRowCollection)}>
                <CollectionLogo
                    className={styles.tableRowImg}
                    size="s"
                    image={imageURL}
                />

                <div className={styles.tableRowInner}>
                    <div className={styles.tableRowTitle}>{title}</div>
                    <div className={styles.tableRowText}>{description}</div>
                </div>
            </div>

            <div className={styles.tableRowItem}><span className={styles.tableRowItemName}>Floor Price</span> 74.84 USDT</div>
            <div className={styles.tableRowItem}><span className={styles.tableRowItemName}>Items</span>215</div>
            <div className={styles.tableRowItem}><span className={styles.tableRowItemName}>Owners</span>18</div>
            <div className={styles.tableRowItem}><span className={styles.tableRowItemName}>Volume</span>1233.17 USDT</div>
            <div className={styles.tableRowItem}>-100.4%</div>
        </div>
    );
}
