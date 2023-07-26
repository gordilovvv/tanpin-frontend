import { NFTExplorer } from '@/components/Explorer';
import { Container, PageError, PageLoader } from '@/components/Layout';
import { CollectionHead } from './components/CollectionHead/CollectionHead';
import { useParams } from 'react-router-dom';
import { useGameQuery } from '@/states/game/hooks/useGameQuery';
import { useCollectionQuery } from '@/states/collection/hooks/useCollectionQuery';
import styles from './SingleCollectionView.module.scss';

export function SingleCollectionView() {
    const { gameID, collectionID } = useParams() as { gameID: string, collectionID: string };

    const {
        game,
        isLoading: isGameLoading,
        error: gameError
    } = useGameQuery(gameID);

    const {
        collection,
        isLoading: isCollectionLoading,
        error: collectionError
    } = useCollectionQuery(collectionID);

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