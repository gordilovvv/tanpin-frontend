import styles from './Table.module.scss';
import { CollectionTable } from '@/components/Collections';
import { CollectionTableRow } from '@/components/Collections/Table/components/Row/CollectionTableRow';
import { useCollectionQuery } from '@/states/collection/hooks/useCollectionsQuery';
import { Title, Button } from '@/uikit';
import { ReactElement, useState } from 'react';

function CollectionPage({ pageNum, onLoading }: { pageNum: number, onLoading: (isLoading: boolean) => void }) {
    const { collection, isLoading } = useCollectionQuery({
        pageNum
    });

    onLoading(isLoading);

    if (isLoading) {
        return;
    }

    return <>{collection!.collections.map((c) => <CollectionTableRow imageURL={c.logoURL} description={c.description} title={c.name} key={c.ID} />)}</>;
}

export function Table() {
    const [cnt, setCnt] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const pages: ReactElement[] = [];
    for (let i = 0; i < cnt; i++) {
        pages.push(
            <CollectionPage
                onLoading={(newLoading) => setIsLoading(newLoading)}
                pageNum={i}
                key={i}
            />
        );
    }

    return (
        <div className={styles.wrapper}>
            <Title className={styles.title}>Trending Collections</Title>

            <CollectionTable
                bottom={
                    <Button
                        view='secondary'
                        block
                        onClick={() => setCnt(cnt + 1)}
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                }
            >
                {pages}
            </CollectionTable>

        </div>
    );

}
