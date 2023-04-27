import { useState } from 'react';
import { Title, Button, Arrow } from '@/uikit';
import { GameCard } from '@/components/Game';
import { CollectionPreview } from '@/components/Collections';
import { Carousel, CarouselState } from '@/components/Carousel';
import { useGamesQuery } from '@/states/game/hooks/useGamesQuery';
import styles from './GamesCarousel.module.scss';

const SKELETON_SlIDES = 4;
const SKELETON_COLLECTIONS = 4;

export function GamesCarousel() {

    const { games, isLoading } = useGamesQuery({
        filter: {
            popular: true,
            includePopularCollections: true
        }
    });
    const [carouselState, setCarouselState] = useState<CarouselState | undefined>();

    return (
        <div>
            <div className={styles.head}>
                <Title>Featured Games</Title>

                <div className={styles.headControls}>
                    <Button
                        view="secondary"
                        disabled={!carouselState?.canScrollPrev}
                        onClick={carouselState?.prev}
                        iconSlot={<Arrow direction='left' />}
                    />

                    <Button
                        view="secondary"
                        disabled={!carouselState?.canScrollNext}
                        onClick={carouselState?.next}
                        iconSlot={<Arrow direction='right' />}
                    />
                </div>
            </div>

            <Carousel
                data={games ?? [...Array(SKELETON_SlIDES).keys()]}
                options={{
                    breakpoints: {
                        '(min-width: 1000px)': { slidesToScroll: 2 }
                    }
                }}
                onNavigate={(state) => setCarouselState(state)}
                renderSlide={({ data }) => (
                    <div className={styles.slide}>

                        <GameCard
                            game={isLoading ? undefined : data}
                        />

                        <div className={styles.collections}>
                            {
                                isLoading
                                    ?
                                    [...Array(SKELETON_COLLECTIONS).keys()].map(i => <CollectionPreview
                                        key={i}
                                        collection={undefined}
                                    />)
                                    :
                                    data.popularCollections!.map(collection => <CollectionPreview
                                        key={collection.ID}
                                        collection={collection}
                                    />)
                            }
                        </div>
                    </div>
                )}
                className={styles.carousel}
            />
        </div>
    );
}
