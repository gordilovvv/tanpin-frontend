import { CollectionLogo } from '@/components/Collections';
import { Container } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Collection } from '@/states/collection/types';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { Game } from '@/states/game/types';
import styles from './CollectionHead.module.scss';

type CollectionHeadProps = {
    game: Game
    collection: Collection
}

export function CollectionHead({ collection }: CollectionHeadProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.background}>
                <img
                    src={collection.coverURL}
                    className={styles.img}
                />
            </div>

            <Container>
                <div className={styles.content}>
                    <div className={styles.top}>
                        {/* <div className={styles.game}>
                            <CollectionLogo
                                image={game.logoURL}
                                size='xxs'
                            />

                            <div className={styles.gameName}>
                                {game.name}
                            </div>
                        </div> */}

                        <div className={styles.collection}>
                            <Link
                                to="/"
                                className={styles.collectionLink}
                            >
                                <CollectionLogo
                                    image={collection.logoURL}
                                    size='m'
                                />

                                <div className={styles.collectionName}>
                                    {collection.name}
                                </div>
                            </Link>
                        </div>

                        <div className={styles.description}>
                            {collection.description}
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        <div className={styles.stats}>
                            <div className={styles.property}>
                                <div className={styles.propertyLabel}>
                                    Floor Price
                                </div>

                                <div className={styles.propertyValue}>
                                    {formatTokenAmount(collection.stats.floor.amount)} {collection.stats.floor.currency}
                                </div>
                            </div>

                            <div className={styles.property}>
                                <div className={styles.propertyLabel}>
                                    Items
                                </div>

                                <div className={styles.propertyValue}>
                                    {/* TODO: format number '10 000' */}
                                    {collection.stats.items}
                                </div>
                            </div>

                            <div className={styles.property}>
                                <div className={styles.propertyLabel}>
                                    Sales
                                </div>

                                <div className={styles.propertyValue}>
                                    {/* TODO: format number '10 000' */}
                                    {collection.stats.sales}
                                </div>
                            </div>

                            <div className={styles.property}>
                                <div className={styles.propertyLabel}>
                                    Volume (1D)
                                </div>

                                <div className={styles.propertyValue}>
                                    {formatTokenAmount(collection.stats.volume.amount)} {collection.stats.volume.currency}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    );
}