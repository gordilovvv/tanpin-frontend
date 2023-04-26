import { useState } from 'react';
import { Title, Button, Arrow } from '@/uikit';
import { GameCard } from '@/components/Game';
import { CollectionPreview } from '@/components/Collections';
import { Carousel, CarouselState } from '@/components/Carousel';
import styles from './GamesCarousel.module.scss';
import { useGamesQuery } from '@/states/game/hooks/useGamesQuery';

type GamesCarouselProps = {
    data: any[]
}

export function GamesCarousel({ data }: GamesCarouselProps) {
    const { games, isLoading } = useGamesQuery({ filter: { popular: true, includePopularCollections: true } });

    const [carouselState, setCarouselState] = useState<CarouselState | undefined>();

    // TODO: isLoading and error handling 
    if (isLoading || games === undefined) {
        return null;
    }

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
                data={games}
                options={{
                    breakpoints: {
                        '(min-width: 1000px)': { slidesToScroll: 2 }
                    }
                }}
                onNavigate={(state) => setCarouselState(state)}
                renderSlide={({ data }) => (
                    <div className={styles.slide}>
                        <GameCard {...data} />

                        <div className={styles.collections}>
                            {data.popularCollections?.map(collection => (
                                <CollectionPreview {...collection} key={collection.ID} />)
                            )}
                        </div>
                    </div>
                )}
                className={styles.carousel}
            />
        </div>
    );
}
