
import { Container } from '@/components/Layout';
import { Footer, Header } from '@/components/Menus';
import { GamesCarousel } from './Home/components/GamesCarousel/GamesCarousel';
import { PromoComponent } from './Home/components/Promo/PromoComponent';

export function Main() {
    return (
        <main>
            <Header />

            <div style={{ overflow: 'hidden', transform: 'translateZ(0)' }}>
                <Container>
                    <GamesCarousel data={[1, 2, 3]} />
                </Container>
            </div>

            <Container>
                <PromoComponent />
            </Container>

            <Footer />
        </main>
    );
}
