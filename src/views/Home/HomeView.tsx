import { Container, PageWrapper } from '@/components/Layout';
import { PromoComponent } from './components/Promo/PromoComponent';
import { PopularCollections } from './components/PopularCollections/PopularCollections';
import { HeroBlock } from './components/HeroBlock/HeroBlock';


export function HomeView() {
    return (
        <>
            <PageWrapper style={{ overflow: 'hidden' }}>
                <HeroBlock />

                {/* <div style={{ overflow: 'hidden', transform: 'translateZ(0)' }}>
                    <Container space>
                        <GamesCarousel />
                    </Container>
                </div> */}

                <Container space>
                    <PopularCollections />
                </Container>

                <Container space>
                    <PromoComponent />
                </Container>
            </PageWrapper>
        </>
    );
}
