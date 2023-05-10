import { CollectionHead } from './components/CollectionHead/CollectionHead';
import { NftCard } from '@/components/Nft';
import styles from './SingleCollectionView.module.scss';
import { Container } from '@/components/Layout';



export function SingleCollectionView() {
    return (
        <>
            <CollectionHead />

            <Container>
                <div className={styles.cardWrapper}>
                    {(new Array(25)).fill(1).map((el, idx) => (<NftCard key={idx} />))}
                </div>
            </Container>
        </>
    );
}