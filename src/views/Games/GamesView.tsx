import styles from './GamesView.module.scss';
import { GamesSearching } from './components/Searching/GamesSearching';
import { Container } from '@/components/Layout';

type GamesViewProps = {
}

export function Games({ }: GamesViewProps) {
    return (
        <>
            <Container space>
                <GamesSearching />
            </Container>
        </>
    );
}