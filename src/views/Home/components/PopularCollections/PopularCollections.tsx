import { Title } from '@/uikit';
import { CollectionsExplorer } from '@/components/Explorer';
import styles from './PopularCollections.module.scss';

export function PopularCollections() {
    return (
        <div className={styles.wrapper}>
            <Title className={styles.title}>
                Trending Collections
            </Title>

            <CollectionsExplorer popularCollections />
        </div>
    );
}
