import { EmblaOptionsType } from 'embla-carousel';

export type CarouselState = {
    prev: () => void,
    next: () => void,
    canScrollPrev: boolean | undefined,
    canScrollNext: boolean | undefined,
    currentIndex: number | undefined,
    currentSnap: number,
    scrollSnaps: number[],
    scrollTo: (index: number) => void
}

export type SlideProps<T = any> = {
    index: number,
    data: T
}

export type CarouselOptions = EmblaOptionsType;