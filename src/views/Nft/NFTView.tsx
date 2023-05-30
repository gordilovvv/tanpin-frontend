import { NFTSearching } from './components/NFTSeacrhing/NFTSearching';
import { Container, PageWrapper } from '@/components/Layout';

export function NFTView() {
    return (
        <PageWrapper>
            <Container space>
                <NFTSearching />
            </Container>
        </PageWrapper>
    );
}