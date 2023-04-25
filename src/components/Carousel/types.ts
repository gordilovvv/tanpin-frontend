export type CarouselState = {
    prev: () => void,
    next: () => void,
    canScrollPrev: boolean | undefined,
    canScrollNext: boolean | undefined,
    currentIndex: number | undefined,
    scrollTo: (index: number) => void
}

export type SlideProps<T = any> = {
    index: number,
    data: T
}