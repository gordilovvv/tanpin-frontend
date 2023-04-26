import { Container } from '@/components/Layout';
import { GamesCarousel } from './Home/components/GamesCarousel/GamesCarousel';
import { PromoComponent } from './Home/components/Promo/PromoComponent';
import { Table } from './Home/Components/Table/Table';

export function Main() {
    return (
        <>
            <div style={{ overflow: 'hidden', transform: 'translateZ(0)' }}>
                <Container space>
                    <GamesCarousel data={[1, 2, 3]} />
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
