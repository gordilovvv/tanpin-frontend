import { Title, Button } from '@/uikit';
import { CollectionTable } from '@/components/Collections';
import styles from './PopularCollections.module.scss';

export function PopularCollections() {
    return (
        <div className={styles.wrapper}>
            <Title className={styles.title}>
                Trending Collections
            </Title>

            <div>
                <CollectionTable
                    filter={{ popular: true }}
                />

                <Button
                    to='/collections'
                    view='secondary'
                    block
                >
                    View collections
                </Button>
            </div>
        </div>
    );
}
