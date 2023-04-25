import { Container } from '@/components/Layout';
import { Footer, Header } from '@/components/Menus';
import { Table } from './Home/Components/Table/Table';
import { GamesCarousel } from './Home/Components/GamesCarousel/GamesCarousel';
import { PromoComponent } from './Home/Components/Promo/PromoComponent';

export function Main() {
    return (
        <main>

            <div style={{ overflow: 'hidden', transform: 'translateZ(0)' }}>
                <Container>
                    <GamesCarousel data={[1, 2, 3]} />
                </Container>
            </div>

            <Container>
                <Table />
            </Container>

            <Container>
                <PromoComponent />
            </Container>

        </main>
    );
}
