import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { GameCard } from '@/components/Game';
import { Title, Button } from '@/uikit';
import styles from './HomeSlider.module.scss';
import { Arrow } from '@/uikit/Icons';
import { CollectionPreview } from '@/components/Collections';



export const SliderComponent = () => {
    const setSwiper = (swiper) => {
        swiperComp = (swiper);
    };
    let swiperComp;
    return (
        <>
            <div className={styles.header}>
                <Title>Featured Games</Title>

                <div className={styles.btnWrapper}>
                    <Button
                        className={styles.arrowBtn}
                        view="secondary"
                        iconSlot={<Arrow />}
                        onClick={() => swiperComp.slidePrev()}
                    >

                    </Button>

                    <Button
                        className={styles.arrowBtn}
                        view="secondary"
                        onClick={() => swiperComp.slideNext()}
                        iconSlot={<Arrow className={styles.rotate} />}
                    >

                    </Button>
                </div>
            </div>

            <Swiper
                slidesPerView={2}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => setSwiper(swiper)}
                breakpoints={{
                    0: {
                        spaceBetween: 8,
                        slidesPerView: 1,
                    },
                    1000: {
                        //   width: 768,
                        spaceBetween: 24,
                        slidesPerView: 2,
                    },

                    1400: {
                        //   width: 768,
                        spaceBetween: 30,
                        slidesPerView: 2,
                    }
                }}
            >

                <SwiperSlide>
                    <div className={styles.slideWrapper}>
                        <GameCard />

                        <div className={styles.collectionWrapper}>
                            <CollectionPreview />
                            <CollectionPreview />
                            <CollectionPreview />
                            <CollectionPreview />
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={styles.slideWrapper}>
                        <GameCard />

                        <div className={styles.collectionWrapper}>
                            <CollectionPreview />
                            <CollectionPreview />
                            <CollectionPreview />
                            <CollectionPreview />
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={styles.slideWrapper}>
                        <GameCard />

                        <div className={styles.collectionWrapper}>
                            <CollectionPreview />
                            <CollectionPreview />
                            <CollectionPreview />
                            <CollectionPreview />
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <GameCard />
                </SwiperSlide>

                <SwiperSlide>
                    <GameCard />
                </SwiperSlide>

                <SwiperSlide>
                    <GameCard />
                </SwiperSlide>

                <SwiperSlide>
                    <GameCard />
                </SwiperSlide>

                <SwiperSlide>
                    <GameCard />
                </SwiperSlide>
            </Swiper>
        </>

    );
};