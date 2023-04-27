import { Title, Button } from '@/uikit';
import { CollectionTable } from '@/components/Collections';
import { useCollectionQuery } from '@/states/collection/hooks/useCollectionsQuery';
import styles from './PopularCollections.module.scss';

export function PopularCollections() {
    const { collection, isLoading } = useCollectionQuery({
        filter: {
            popular: true
        }
    });

    return (
        <div className={styles.wrapper}>
            <Title className={styles.title}>
                Trending Collections
            </Title>

            <CollectionTable
                items={collection?.collections ?? []}
                loading={isLoading}
                button={
                    <Button
                        view='secondary'
                        block
                    >
                        Explore Collections
                    </Button>
                }
            />
        </div>
    );

}
