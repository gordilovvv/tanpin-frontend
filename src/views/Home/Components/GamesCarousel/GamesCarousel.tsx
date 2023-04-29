import { useMemo, useState } from 'react';
import { Title, Button, Arrow } from '@/uikit';
import { GameCard } from '@/components/Game';
import { CollectionPreview } from '@/components/Collections';
import { Carousel, CarouselState, SlideProps } from '@/components/Carousel';
import { useGamesQuery } from '@/states/game/hooks/useGamesQuery';
import { Game } from '@/states/game/types';
import styles from './GamesCarousel.module.scss';

const SKELETON_SlIDES = 2;
const SKELETON_COLLECTIONS = 4;

const Slide = ({ loading, data }: { loading?: boolean } & SlideProps<Game | undefined>) => {
    if (loading || !data) {
        return (
            <div className={styles.slide}>
                <GameCard game={undefined} />

                <div className={styles.collections}>
                    {[...Array(SKELETON_COLLECTIONS).keys()].map(index => <CollectionPreview
                        key={index}
                        collection={undefined}
                    />)}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.slide}>
            <GameCard game={data} />

            <div className={styles.collections}>
                {data.popularCollections!.map(collection => <CollectionPreview
                    key={collection.ID}
                    collection={collection}
                />)}
            </div>
        </div>
    );
};

export function GamesCarousel() {
    const { games, isLoading: isLoadingQuery } = useGamesQuery({
        filter: {
            popular: true,
            includePopularCollections: true
        }
    });

    const isLoading = isLoadingQuery || !games;

    const carouselData = useMemo(() => {
        if (isLoading) {
            return [...Array(SKELETON_SlIDES).keys()];
        } else {
            return games ?? [];
        }
    }, [games, isLoading]);

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
                data={carouselData}
                options={{
                    breakpoints: {
                        '(min-width: 1000px)': { slidesToScroll: 2 }
                    }
                }}
                onNavigate={(state) => setCarouselState(state)}
                renderSlide={
                    (slideProps: SlideProps<Game | undefined>) => isLoading
                        ? <Slide
                            loading={true}
                            {...slideProps}
                        />
                        : <Slide {...slideProps} />
                }
                className={styles.carousel}
            />
        </div>
    );
}
