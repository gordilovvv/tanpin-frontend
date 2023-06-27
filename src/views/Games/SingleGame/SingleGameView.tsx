import { Container, PageWrapper } from '@/components/Layout';
import { GameHead } from './components/Head/GameHead';
import { useParams } from 'react-router-dom';
import { useGameQuery } from '@/states/game/hooks/useGameQuery';
import { CollectionExplorer } from '@/components/Explorer';
import styles from './SingleGameView.module.scss';

export function SingleGameView() {
    const { gameID } = useParams();
    const { game } = useGameQuery(gameID as string);

    return (
        <PageWrapper hasPaddingTop={false}>
            <div className={styles.wrapper}>
                <GameHead game={game} />

                <Container space>
                    <CollectionExplorer gameID={gameID} />
                </Container>
            </div>
        </PageWrapper>
    );
}
