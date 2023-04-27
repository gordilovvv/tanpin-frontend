import { Container } from '@/components/Layout';
import { GamesCarousel } from './Components/GamesCarousel/GamesCarousel';
import { PromoComponent } from './Components/Promo/PromoComponent';
import { PopularCollections } from './Components/PopularCollections/PopularCollections';

export function MainView() {
    return (
        <>
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
        </>
    );
}
