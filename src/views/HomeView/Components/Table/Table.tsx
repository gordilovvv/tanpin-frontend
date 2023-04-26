import styles from './Table.module.scss';
import { CollectionTable } from '@/components/Collections';
import { CollectionTableRow } from '@/components/Collections/Table/components/Row/CollectionTableRow';
import { useCollectionQuery } from '@/states/collection/hooks/useCollectionsQuery';
import { Title, Button } from '@/uikit';

export function Table() {
    const { collection, isLoading } = useCollectionQuery({
        pageNum: 0,
        filter: {
            sort: 'TRENDING'
        }
    });


    return (
        <div className={styles.wrapper}>
            <Title className={styles.title}>Trending Collections</Title>

            <CollectionTable
                bottom={
                    <Button
                        view='secondary'
                        block
                    >
                        Explore Collections
                    </Button>
                }
            >

                {!isLoading && collection!.collections.map((c) => (
                    <CollectionTableRow
                        imageURL={c.logoURL}
                        description={c.description}
                        title={c.name}
                        key={c.ID}
                    />
                ))};
            </CollectionTable>

        </div>
    );

}
