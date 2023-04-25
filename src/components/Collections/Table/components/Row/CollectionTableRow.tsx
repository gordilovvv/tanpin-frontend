import { CollectionLogo } from '@/components/Collections';
import styles from './CollectionTableRow.module.scss';
import classNames from 'classnames';


type CollectionTableRowProps = {
}

export function CollectionTableRow({ }: CollectionTableRowProps) {
    return (

        <div
            className={styles.tableRow}

        >
            <div className={classNames(styles.tableRowItem, styles.tableRowCounter)}>1</div>

            <div className={classNames(styles.tableRowItem, styles.tableRowCollection)}>
                <CollectionLogo
                    className={styles.tableRowImg}
                    size="s"
                    image='https://media.istockphoto.com/id/1322123064/photo/portrait-of-an-adorable-white-cat-in-sunglasses-and-an-shirt-lies-on-a-fabric-hammock.jpg?s=612x612&w=0&k=20&c=-G6l2c4jNI0y4cenh-t3qxvIQzVCOqOYZNvrRA7ZU5o='
                />

                <div className={styles.tableRowInner}>
                    <div className={styles.tableRowTitle}>Axies Drop 2</div>
                    <div className={styles.tableRowText}>Axie Infinity</div>
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