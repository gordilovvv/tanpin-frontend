import { CollectionLogo } from '@/components/Collections';
import { Container } from '@/components/Layout';
import { Collection } from '@/states/collection/types';
import { Game } from '@/states/game/types';
import styles from './CollectionHead.module.scss';

type CollectionHeadProps = {
    game: Game
    collection: Collection
}

export function CollectionHead({ game, collection }: CollectionHeadProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.background}>
                <img
                    src={collection.coverUrl}
                    className={styles.img}
                />
            </div>

            <Container>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.game}>
                            <CollectionLogo
                                image={game.logoURL}
                                size='xxs'
                            />

                            <div className={styles.gameName}>
                                {game.name}
                            </div>
                        </div>

                        <div className={styles.collection}>
                            <CollectionLogo
                                image={collection.logoUrl}
                                size='m'
                            />

                            <div className={styles.collectionName}>
                                {collection.name}
                            </div>
                        </div>

                        <div className={styles.description}>
                            {collection.description}
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    );
}