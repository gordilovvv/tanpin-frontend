import { useCallback } from 'react';
import { Button } from '@/uikit';
import { EmptyResult } from '..';
import { CollectionsList } from './List/CollectionsList';
import { CollectionsTable } from './Table/CollectionsTable';
import { useCollectionsFilterState } from '@/states/explorer/hooks/useCollectionsFilterState';
import styles from './CollectionsExplorer.module.scss';

type CollectionsExplorerProps = {
    gameID?: string,
    popularCollections?: boolean
}

export function CollectionsExplorer({ gameID, popularCollections }: CollectionsExplorerProps) {
    const filterState = useCollectionsFilterState({
        gameID,
        popular: popularCollections
    });

    const renderEmpty = useCallback(() => {
        return <EmptyResult
            title="Nothing found"
            text="We couldn't find anything with this criteria"
        />;
    }, []);

    return (
        <div className={styles.wrapper}>
            <CollectionsTable
                list={<CollectionsList
                    filter={filterState}
                    empty={renderEmpty}
                />}
            />

            {popularCollections && <Button
                to='/collections'
                view='secondary'
            >
                View collections
            </Button>}
        </div>
    );
}
