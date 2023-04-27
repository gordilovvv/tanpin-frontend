import { HTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel, { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel-react';
import { CarouselSlide } from './Slide/CarouselSlide';
import { CarouselState, SlideProps } from './types';
import styles from './Carousel.module.scss';

type CarouselProps = {
    data: any[],
    options?: EmblaOptionsType,
    onNavigate: (state: CarouselState) => void,
    renderSlide: (props: SlideProps) => JSX.Element
}

/**
 * Carousel Component
 * 
 * @param data array of data for each slide
 * @param onNavigate use it to save Carousel State
 * @param renderSlide use it to render node
 * 
 * @example Important! For gap and slide size use CSS Vars
 * ```
 * --carousel-gap: 32px;
 * --carousel-slide-width: 50%;
 * ```
 */
export function Carousel({
    data,
    onNavigate,
    renderSlide,
    options = {},
    className,
    ...props
}: CarouselProps & HTMLAttributes<HTMLDivElement>) {
    const emblaOptions = useMemo<EmblaOptionsType>(() => ({
        align: 'start',
        containScroll: 'keepSnaps',
        startIndex: 0,
        dragFree: false,
        ...options
    }), [options]);

    const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
    const [emblaState, setEmblaState] = useState<CarouselState | undefined>(); // We want to save the state here and share it by `onNavigate`

    // Call onNavigate every time state have been changed
    useEffect(() => {
        if (emblaState) {
            onNavigate(emblaState);
        }
    }, [emblaState, onNavigate]);

    // Save Embla state
    const saveEmblaState = useCallback((embla: EmblaCarouselType) => {
        setEmblaState({
            prev: () => {
                embla.scrollPrev();
            },
            next: () => {
                embla.scrollNext();
            },
            canScrollPrev: embla.canScrollPrev(),
            canScrollNext: embla.canScrollNext(),
            currentIndex: embla.selectedScrollSnap(),
            scrollTo: (index: number) => {
                embla.scrollTo(index);
            }
        });
    }, [data]);

    // Watch for slides updates
    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit();
        }

        // return () => emblaApi?.destroy();
    }, [data, emblaApi]);

    // Watch for window resize
    useEffect(() => {
        if (emblaApi) {
            const handleResize = () => {
                emblaApi.reInit();
            };

            emblaApi.on('resize', handleResize);

            return () => {
                emblaApi.off('resize', handleResize);
            };
        }
    }, [emblaApi]);

    // Watch for interaction with Carousel and save the updated state
    // The select event is triggered by drag interactions or the scrollNext, scrollPrev or scrollTo methods.
    useEffect(() => {
        if (emblaApi) {
            const handleSelect = () => {
                saveEmblaState(emblaApi);
            };

            handleSelect();

            emblaApi.on('select', handleSelect);

            return () => {
                emblaApi.off('select', handleSelect);
            };
        }
    }, [emblaApi, saveEmblaState]);

    return (
        <div
            ref={emblaRef}
            className={className}
            {...props}
        >
            <div className={styles.container}>
                {data.map((item, index) => <CarouselSlide
                    key={index}
                    index={index}
                    data={item}
                    renderSlide={renderSlide}
                />)}
            </div>
        </div>
    );
}
