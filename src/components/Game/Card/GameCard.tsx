import { Button, Skeleton } from '@/uikit';
import { CollectionLogo } from '@/components/Collections/Logo/CollectionLogo';
import styles from './GameCard.module.scss';
import { Game } from '@/states/game/types';
import classNames from 'classnames';

type GameCardProps = {
    game: Game | undefined,
};

export function GameCard({ game }: GameCardProps) {

    if (!game) {
        return (
            <div className={classNames(styles.card, styles.skeletonWrapper)}>
                <div className={styles.skeletonInner}>
                    <Skeleton
                        className={styles.skeletonMain}
                    />

                    <div className={styles.skeletonRow}>
                        <div
                            className={styles.skeletonItem}
                        >
                            <Skeleton className={styles.skeletonHeader} />
                            <Skeleton className={styles.skeletonBody} />
                        </div>

                        <div
                            className={styles.skeletonItem}
                        >
                            <Skeleton className={styles.skeletonHeader} />
                            <Skeleton className={styles.skeletonBody} />
                        </div>

                        <div
                            className={styles.skeletonItem}
                        >
                            <Skeleton className={styles.skeletonHeader} />
                            <Skeleton className={styles.skeletonBody} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const { name, logoURL, imageURL, stats } = game;
    const { items, volume, collections } = stats;
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
