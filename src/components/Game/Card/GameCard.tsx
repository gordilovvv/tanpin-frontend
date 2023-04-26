import { Button } from '@/uikit';
import { CollectionLogo } from '@/components/Collections/Logo/CollectionLogo';
import styles from './GameCard.module.scss';
import { Game, GameStats } from '@/states/game/types';

type GameCardProps = Game & {
    stats: GameStats
};

export function GameCard({ name, logoURL, imageURL, stats: { items, volume, collections } }: GameCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.background}>
                <img
                    className={styles.backgroundImage}
                    src={imageURL}
                    alt=""
                />
            </div>

            <div className={styles.contentWrap}>
                <div className={styles.content}>
                    <div className={styles.info}>
                        <div className={styles.header}>
                            <CollectionLogo
                                size='xs'
                                image={logoURL}
                            />

                            <div className={styles.headerTitle}>
                                {name}
                            </div>
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>Volume (1 day)</div>
                                <div className={styles.itemBody}>{volume.amount} {volume.currency}</div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.itemTitle}>Items</div>
                                <div className={styles.itemBody}>{items}</div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.itemTitle}>Collections</div>
                                <div className={styles.itemBody}>{collections}</div>
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
