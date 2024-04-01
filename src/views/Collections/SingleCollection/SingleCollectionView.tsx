import { NFTExplorer } from '@/components/Explorer';
import { Container, PageError, PageLoader } from '@/components/Layout';
import { CollectionHead } from './components/CollectionHead/CollectionHead';
import { useParams } from 'react-router-dom';
import { useGameFetcher } from '@/states/game/hooks/useGameFetcher';
import { useCollectionFetcher } from '@/states/collection/hooks/useCollectionFetcher';
import styles from './SingleCollectionView.module.scss';

export function SingleCollectionView() {
    const { gameID, collectionID } = useParams() as { gameID: string, collectionID: string };

    const {
        game,
        isLoading: isGameLoading,
        error: gameError
    } = useGameFetcher(gameID);

    const {
        collection,
        isLoading: isCollectionLoading,
        error: collectionError
    } = useCollectionFetcher(collectionID);

    if (gameError || collectionError)
        return (<PageError />);

    if (isGameLoading || isCollectionLoading || !game || !collection)
        return (<PageLoader />);

    return (
        <div className={styles.container}>
            <CollectionHead
                game={game}
                collection={collection}
            />

            <Container space>
                <NFTExplorer
                    type='items'
                    collection={collection}
                />
            </Container>
        </div>
    );
}