import { useCallback, useMemo } from 'react';
import { CarouselOptions, CarouselWithAutoScroll, SlideProps } from '@/components/Carousel';
import { NFTGTA } from './NFTGTA';
import { BlackRussia } from './BlackRussia';
import styles from './HeroCarousel.module.scss';

export function HeroCarousel() {
    const carouselData = useMemo(() => [
        <BlackRussia key='2' />,
        <NFTGTA key='1' />
    ], []);

    const options: CarouselOptions = useMemo(() => ({
        slidesToScroll: 1
    }), []);

    const renderCarouselSlide = useCallback((data: SlideProps<typeof carouselData[0]>) => {
        return data.data;
    }, []);

    return (
        <CarouselWithAutoScroll
            data={carouselData}
            options={options}
            renderSlide={renderCarouselSlide}
            className={styles.carousel}
        />
    );
}