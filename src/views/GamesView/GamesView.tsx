import styles from './GamesView.module.scss';
import { GamesSearching } from './components/Searching/GamesSearching';
import { Container } from '@/components/Layout';


export function GamesView() {
    return (
        <Container space>
            <GamesSearching />
        </Container>
    );
}
