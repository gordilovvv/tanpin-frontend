import styles from './CollectionsView.module.scss';
import { Container } from '@/components/Layout';
import { Table } from './components/Table/Table';

type CollectionsViewProps = {
}

export function Collections({ }: CollectionsViewProps) {
    return (
        <>
            <Container space>
                <Table />
            </Container>
        </>
    );
}