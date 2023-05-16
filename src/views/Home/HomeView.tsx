import { Container, PageWrapper } from '@/components/Layout';
import { GamesCarousel } from './components/GamesCarousel/GamesCarousel';
import { PromoComponent } from './components/Promo/PromoComponent';
import { PopularCollections } from './components/PopularCollections/PopularCollections';


export function HomeView() {
    return (
        <>
            <PageWrapper>
                <div style={{ overflow: 'hidden', transform: 'translateZ(0)' }}>
                    <Container space>
                        <GamesCarousel />
                    </Container>
                </div>

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
