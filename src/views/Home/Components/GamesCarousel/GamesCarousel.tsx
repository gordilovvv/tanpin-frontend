import { useState } from 'react';
import { Title, Button, Arrow } from '@/uikit';
import { GameCard } from '@/components/Game';
import { CollectionPreview } from '@/components/Collections';
import { Carousel, CarouselState } from '@/components/Carousel';
import styles from './GamesCarousel.module.scss';

type GamesCarouselProps = {
    data: any[]
}

export function GamesCarousel({ data }: GamesCarouselProps) {
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
                data={data}
                options={{
                    breakpoints: {
                        '(min-width: 1000px)': { slidesToScroll: 2 }
                    }
                }}
                onNavigate={(state) => setCarouselState(state)}
                renderSlide={({ data }) => <div className={styles.slide}>
                    <GameCard />

                    <div className={styles.collections}>
                        <CollectionPreview />
                        <CollectionPreview />
                        <CollectionPreview />
                        <CollectionPreview />
                    </div>
                </div>}
                className={styles.carousel}
            />
        </div>
    );
}
