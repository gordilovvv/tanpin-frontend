import { Link } from 'react-router-dom';
import styles from './CollectionPreview.module.scss';

export const CollectionPreview = () => {
    return (
        <Link
            to='/'
            className={styles.item}
        >
            <img
                src="https://lh3.googleusercontent.com/GezP5_0gEdPqOeat9AOiimDfpboI9BactEOg1QNP4Go2oTLdpQu2nK2eUbHiDjsYsL2fyNeNEEURjwZx6jmmb43InnM=w640-h400-e365-rj-sc0x00ffffff"
                className={styles.img}
            />

            <div className={styles.itemBody}>
                <div className={styles.itemHeader}>2023 Cars</div>

                <div className={styles.items}>
                    <div className={styles.itemsBody}>
                        <div className={styles.itemsHeader}>Floor price</div>

                        <div className={styles.itemsPrice}>
                            <span className={styles.priceWhite}>1.40</span>
                            <span className={styles.price}>USDT</span>
                        </div>
                    </div>

                    <div className={styles.itemsBody}>
                        <div className={styles.itemsHeader}>Floor price</div>

                        <div className={styles.itemsPrice}>
                            <span className={styles.priceWhite}>1.40</span>
                            <span className={styles.price}>USDT</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};