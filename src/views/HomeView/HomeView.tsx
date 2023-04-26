import { Container } from '@/components/Layout';
import { GamesCarousel } from './Components/GamesCarousel/GamesCarousel';
import { PromoComponent } from './Components/Promo/PromoComponent';
import { Table } from './Components/Table/Table';

export function MainView() {

    return (
        <>
            <div style={{ overflow: 'hidden', transform: 'translateZ(0)' }}>
                <Container space>
                    <GamesCarousel />
                </Container>
            </div>

            <Container space>
                <Table />
            </Container>

            <Container space>
                <PromoComponent />
            </Container>
        </>
    );
}
