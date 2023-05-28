import { Button, Skeleton } from '@/uikit';
import { CollectionLogo } from '@/components/Collections/Logo/CollectionLogo';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { Game } from '@/states/game/types';
import classNames from 'classnames';
import styles from './GameCard.module.scss';

type GameCardProps = {
    game: Game
}

export function GameCard({ game }: GameCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.background}>
                <img
                    className={styles.backgroundImage}
                    src={game.imageURL}
                    alt={game.name}
                />
            </div>

            <div className={styles.contentWrap}>
                <div className={styles.content}>
                    <div className={styles.info}>
                        <div className={styles.header}>
                            <CollectionLogo
                                size='xs'
                                image={game.logoURL}
                            />

                            <div className={styles.headerTitle}>
                                {game.name}
                            </div>
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>Volume (1 day)</div>
                                <div className={styles.itemBody}>{formatTokenAmount(game.stats.volume.amount)} {game.stats.volume.currency}</div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.itemTitle}>Items</div>
                                <div className={styles.itemBody}>{game.stats.items}</div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.itemTitle}>Collections</div>
                                <div className={styles.itemBody}>{game.stats.collections}</div>
                            </div>
                        </div>
                    </div>

                    <Button
                        to={`/${game.ID}`}
                        view="secondary"
                        className={styles.btn}
                    >
                        Open collections
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function GameCardSkeleton() {
    return (
        <div className={classNames(styles.card, styles.skeletonWrapper)}>
            <div className={styles.skeletonInner}>
                <Skeleton className={styles.skeletonMain} />

                <div className={styles.skeletonRow}>
                    <div className={styles.skeletonItem}>
                        <Skeleton className={styles.skeletonHeader} />
                        <Skeleton className={styles.skeletonBody} />
                    </div>

                    <div className={styles.skeletonItem}>
                        <Skeleton className={styles.skeletonHeader} />
                        <Skeleton className={styles.skeletonBody} />
                    </div>

                    <div className={styles.skeletonItem}>
                        <Skeleton className={styles.skeletonHeader} />
                        <Skeleton className={styles.skeletonBody} />
                    </div>
                </div>
            </div>
        </div>
    );
}