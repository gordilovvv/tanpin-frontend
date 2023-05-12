import { CollectionLogo } from '@/components/Collections';
import { Container } from '@/components/Layout';
import styles from './CollectionHead.module.scss';
import { Link } from 'react-router-dom';


export function CollectionHead() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.imgWrapp}>
                <img
                    src="https://venagid.ru/wp-content/uploads/2016/12/edin-chavez.jpg"
                    className={styles.img}
                />

                <Container className={styles.inner}>
                    <div className={styles.innerGap}>
                        <div

                            className={styles.header}
                        >
                            <Link
                                to="/"
                                className={styles.link}
                            >
                                <CollectionLogo
                                    image='https://e7.pngegg.com/pngimages/556/552/png-clipart-grand-theft-auto-v-grand-theft-auto-vice-city-computer-icons-rockstar-games-grand-theft-auto-episodes-from-liberty-city-social-icons-miscellaneous-game.png'
                                    size='xxs'
                                />
                            </Link>

                            <Link
                                to="/3"
                                className={styles.link}
                            >
                                <div className={styles.title}>
                                    Axies Infinity
                                </div>
                            </Link>
                        </div>

                        <div className={styles.info}>
                            <CollectionLogo
                                image='https://e7.pngegg.com/pngimages/556/552/png-clipart-grand-theft-auto-v-grand-theft-auto-vice-city-computer-icons-rockstar-games-grand-theft-auto-episodes-from-liberty-city-social-icons-miscellaneous-game.png'
                                size='m'
                            //TODO подправить размер после мержа, указан не тот!
                            />

                            <div className={styles.infoTitle}>
                                Axies Drop SS23
                            </div>
                        </div>
                    </div>

                    <div className={styles.text}>
                        Harvest. Build. Dream. Homeland is back! Я так и не понял нужно ли описание коллекции, но в целом оно не отличается от оного на странице игры.
                    </div>
                </Container>

            </div>


            <Container className={styles.items}>
                <div className={styles.item}>
                    <div className={styles.itemTitle}>Floor Price</div>
                    <div className={styles.itemBody}>57.8 USDT</div>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemTitle}>Floor Price</div>
                    <div className={styles.itemBody}>57.8 USDT</div>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemTitle}>Floor Price</div>
                    <div className={styles.itemBody}>57.8 USDT</div>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemTitle}>Floor Price</div>
                    <div className={styles.itemBody}>57.8 USDT</div>
                </div>
            </Container>

        </ div>
    );
}