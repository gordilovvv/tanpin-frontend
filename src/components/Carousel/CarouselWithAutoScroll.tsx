import { HTMLAttributes, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Carousel, CarouselProps } from './Carousel';
import styles from './CarouselWithAutoScroll.module.scss';
import { CarouselState } from '.';
import { InView } from 'react-intersection-observer';
import { CarouselNavigation } from './Naviagation/CarouselNavigation';
import { useHasFocus } from '@/hooks/useHasFocus';

type CarouselWithAutoScrollProps = {
    extend?: number,
    autoScroll?: boolean,
    autoScrollTimeout?: number,
    paused?: boolean,
    skipControls?: boolean
} & CarouselProps;

export function CarouselWithAutoScroll({
    autoScroll = true,
    autoScrollTimeout = 8000,
    paused = false,
    style,
    className,
    onNavigate,
    ...props
}: CarouselWithAutoScrollProps & HTMLAttributes<HTMLDivElement>) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [carouselState, setCarouselState] = useState<CarouselState | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const hasFocus = useHasFocus();
    const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

    const handleNavigate = useCallback((state: CarouselState) => {
        onNavigate?.(state);
        setCarouselState(state);
    }, [onNavigate]);

    const handleSlideChange = useCallback((slideIndex: number) => {
        carouselState?.scrollTo(slideIndex);
    }, [carouselState]);

    // Detect hover
    useLayoutEffect(() => {
        const carouselElement = carouselRef.current;

        if (carouselElement) {
            const handleMouseOver = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);

            carouselElement.addEventListener('mouseover', handleMouseOver);
            carouselElement.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                carouselElement.removeEventListener('mouseover', handleMouseOver);
                carouselElement.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [carouselRef]);

    const isPaused = isHovered || !hasFocus || paused;

    // Stop or run autoScroll
    useLayoutEffect(() => {
        if (autoScroll) {
            if (isPaused) {
                autoScrollTimer.current && clearTimeout(autoScrollTimer.current);
            } else {
                autoScrollTimer.current = setTimeout(() => {
                    if (carouselState) {
                        carouselState.canScrollNext ? carouselState.next() : carouselState.scrollTo(0);
                    }
                }, autoScrollTimeout);
            }
        }

        return () => {
            autoScrollTimer.current && clearTimeout(autoScrollTimer.current);
        };
    }, [isPaused, autoScroll, autoScrollTimeout, carouselState]);

    const currentSnap = carouselState ? Math.floor(carouselState.currentSnap + 1 / carouselState.scrollSnaps.length) : 0;
    const totalSnaps = (carouselState && carouselState.scrollSnaps.length) || 0;

    return (
        <InView
            as='div'
            onChange={(inView) => setIsHovered(!inView)}
            threshold={0.1}
            style={style}
            className={className}
        >
            <div
                ref={carouselRef}
                className={styles.inner}
            >
                <Carousel
                    {...props}
                    onNavigate={handleNavigate}
                    className={styles.carousel}
                />

                <div className={styles.navigation}>
                    <CarouselNavigation
                        animationTime={autoScrollTimeout}
                        paused={isPaused}
                        current={currentSnap}
                        total={totalSnaps}
                        onChange={handleSlideChange}
                    />
                </div>
            </div>
        </InView>
    );
}