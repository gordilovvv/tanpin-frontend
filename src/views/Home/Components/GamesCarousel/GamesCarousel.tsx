import { useState } from 'react';
import { Title, Button, Arrow } from '@/uikit';
import { GameCard } from '@/components/Game';
import { CollectionPreview } from '@/components/Collections';
import { Carousel, CarouselState, SlideProps } from '@/components/Carousel';
import { useGamesQuery } from '@/states/game/hooks/useGamesQuery';
import { Game } from '@/states/game/types';
import styles from './GamesCarousel.module.scss';
import { times } from 'lodash';
import { GameCardSkeleton } from '@/components/Game/Card/GameCard';

const SKELETON_SlIDES = 2;
const SKELETON_COLLECTIONS = 4;

const Slide = ({ loading, data }: { loading?: boolean } & SlideProps<Game | undefined>) => {
    if (loading || !data) {
        return (
            <div className={styles.slide}>
                <GameCardSkeleton />

                <div className={styles.collections}>
                    {times(SKELETON_COLLECTIONS).map(index => <CollectionPreview
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
    const [carouselState, setCarouselState] = useState<CarouselState | undefined>();

    const { games, isLoading: isLoadingQuery } = useGamesQuery({
        filter: {
            popular: true,
            includePopularCollections: true
        }
    });

    const isLoading = isLoadingQuery || !games;
    const carouselData = isLoading ? times(SKELETON_SlIDES) : games ?? [];

    const renderCarouselSlide = (slideProps: SlideProps<Game | undefined>) => {
        if (isLoading) {
            return (
                <Slide
                    loading={true}
                    {...slideProps}
                />
            );
        }

        return (<Slide {...slideProps} />);
    };

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
                onNavigate={setCarouselState}
                renderSlide={renderCarouselSlide}
                className={styles.carousel}
            />
        </div>
    );
}
