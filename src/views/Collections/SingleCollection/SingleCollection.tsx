import { CollectionHead } from './components/CollectionHead/CollectionHead';
import { NftCard } from '@/components/Nft';
import styles from './SingleCollection.module.scss';
import { Container } from '@/components/Layout';



export function SingleCollection() {
    return (
        <>
            <CollectionHead />

            <Container>
                <div className={styles.cardWrapper}>
                    {(new Array(25)).fill(1).map(el => (<NftCard key={el} />))}
                </div>
            </Container>
        </>
    );
}