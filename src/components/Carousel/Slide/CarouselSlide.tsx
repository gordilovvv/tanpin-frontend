import { SlideProps } from '../types';
import styles from './CarouselSlide.module.scss';

type CarouselSlideProps = {
    index: number,
    data: any,
    renderSlide: (props: SlideProps) => JSX.Element
}

export function CarouselSlide({ index, data, renderSlide }: CarouselSlideProps) {
    return (
        <div className={styles.slide}>
            {renderSlide({
                index,
                data
            })}
        </div>
    );
}