import { Button } from '@/uikit';
import { CollectionLogo } from '@/components/Collections/Logo/CollectionLogo';
import styles from './GameCard.module.scss';

export function GameCard() {
    return (
        <div className={styles.card}>
            <div className={styles.background}>
                <img
                    className={styles.backgroundImage}
                    src="https://storage.yandexcloud.net/stage01-metronews-transfer/media/20220618/13/20/858x540_60e21547_dvindb8d.jpg"
                    alt=""
                />
            </div>

            <div className={styles.contentWrap}>
                <div className={styles.content}>
                    <div className={styles.info}>
                        <div className={styles.header}>
                            <CollectionLogo image={'https://lh3.googleusercontent.com/GezP5_0gEdPqOeat9AOiimDfpboI9BactEOg1QNP4Go2oTLdpQu2nK2eUbHiDjsYsL2fyNeNEEURjwZx6jmmb43InnM=w640-h400-e365-rj-sc0x00ffffff'} />

                            <div className={styles.headerTitle}>
                                NFTGTA
                            </div>
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>Volume (1 day)</div>
                                <div className={styles.itemBody}>188 421 USDT</div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.itemTitle}>Items</div>
                                <div className={styles.itemBody}>10 000</div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.itemTitle}>Collections</div>
                                <div className={styles.itemBody}>7</div>
                            </div>
                        </div>
                    </div>

                    <Button
                        className={styles.btn}
                        view="secondary"
                    >
                        Open collections
                    </Button>
                
                </div>
            </div>
        </div>
    );
}