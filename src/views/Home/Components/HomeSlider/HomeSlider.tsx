import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { MEDIA_SIZES } from '@/config/constants';

import { GameCard } from "@/components/Game/GameCard"
import { Title,Button } from "@/uikit"

import styles from './HomeSlider.module.scss'
import {Arrow} from '@/uikit/Icons'


export const SliderComponent = ()=>{
    return (
        <>
            <div className={styles.header}>
                <Title>Featured Games</Title>
                <div className={styles.btnWrapper}>
                    <Button className={styles.arrowBtn} view="secondary">
                        <Arrow />
                    </Button>
                    <Button className={styles.arrowBtn} view="secondary">
                        <Arrow className={styles.rotate} />
                    </Button>
                </div>
            </div>
            <Swiper
               slidesPerView={2}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                    0: {
                        spaceBetween:8,
                      slidesPerView: 1,
                    },
                    [MEDIA_SIZES.phone]:{
                        //   width: 768,
                        spaceBetween:24,
                          slidesPerView: 2,
                        },
                   
                    [MEDIA_SIZES.tablet]:{
                    //   width: 768,
                        spaceBetween:30,
                      slidesPerView: 2,
                    }
                  }}
                >
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
                     <SwiperSlide>
                        <GameCard />
                     </SwiperSlide>
            </Swiper>
            </>
        
    )
}