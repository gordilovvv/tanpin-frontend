import { memo, useMemo } from 'react';
import { SlideButton } from './SlideButton';
import styles from './CarouselNavigation.module.scss';

type CarouselNavigationProps = {
    // Можно сделать выключение по пропсу. Тогда вместо SlideButton рендерить просто кнопку без прогресса слайда
    // enabled: boolean
    paused: boolean
    current: number
    total: number
    animationTime: number
    onChange: (index: number) => void
}

export const CarouselNavigation = memo(({ paused, current, total, animationTime, onChange }: CarouselNavigationProps) => {
    const slides = useMemo(() => {
        return new Array(total).fill(0);
    }, [total]);

    return (
        <div className={styles.list}>
            {slides.map((_, index) => {
                return <SlideButton
                    key={index}
                    paused={paused}
                    active={index === current}
                    animationTime={animationTime}
                    onClick={() => {
                        onChange(index);
                    }}
                />;
            })}
        </div>
    );
});

CarouselNavigation.displayName = 'CarouselNavigation';