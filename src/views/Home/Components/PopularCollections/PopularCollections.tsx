import { Title, Button } from '@/uikit';
import { CollectionTable } from '@/components/Collections';
import styles from './PopularCollections.module.scss';

export function PopularCollections() {
    return (
        <div className={styles.wrapper}>
            <Title className={styles.title}>
                Trending Collections
            </Title>

            <CollectionTable
                customButtonDown={<Button
                    to='/collections'
                    view='secondary'
                    block
                >
                    View collections
                </Button>}

            />
        </div>
    );

}
