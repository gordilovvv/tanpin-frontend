import styles from './CollectionsView.module.scss';
import { Container } from '@/components/Layout';
import { Table } from './components/Table/Table';


export function CollectionsView() {
    return (
        <Container space>
            <Table />
        </Container>
    );
}