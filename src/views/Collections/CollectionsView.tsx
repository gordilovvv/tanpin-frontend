import { Container, PageWrapper } from '@/components/Layout';
import { Table } from './components/Table/Table';

export function CollectionsView() {
    return (
        <PageWrapper>
            <Container space>
                <Table />
            </Container>
        </PageWrapper>
    );
}
