import styles from './Table.module.scss';
import { CollectionTable } from '@/components/Collections';
import { Title } from '@/uikit';

export function Table() {

    return (
        <div>

            <Title className={styles.title}>Collections</Title>

            <div className={styles.text}>
                Explore NFT collections from your favorite games
            </div>

            <div className={styles.inner}>
                <CollectionTable />
            </div>

        </div >
    );

}
