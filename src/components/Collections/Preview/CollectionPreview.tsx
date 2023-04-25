import { Link } from 'react-router-dom';
import styles from './CollectionPreview.module.scss';
import { CollectionLogo } from '..';

export const CollectionPreview = () => {
    return (
        <Link
            to='/'
            className={styles.wrap}
        >
            <CollectionLogo
                size='m'
                image='https://lh3.googleusercontent.com/GezP5_0gEdPqOeat9AOiimDfpboI9BactEOg1QNP4Go2oTLdpQu2nK2eUbHiDjsYsL2fyNeNEEURjwZx6jmmb43InnM=w640-h400-e365-rj-sc0x00ffffff'
                className={styles.logo}
            />

            <div className={styles.content}>
                <div className={styles.name}>2023 Cars</div>

                <div className={styles.stats}>
                    <div className={styles.item}>
                        <div className={styles.itemLabel}>
                            Floor price
                        </div>

                        <div className={styles.itemValue}>
                            1.40 <span>USDT</span>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemLabel}>
                            Floor price
                        </div>

                        <div className={styles.itemValue}>
                            1.40 <span>USDT</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};