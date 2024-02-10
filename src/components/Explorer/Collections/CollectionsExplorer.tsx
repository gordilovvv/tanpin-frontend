import { useCallback } from 'react';
import { Button } from '@/uikit';
import { EmptyResult } from '..';
import { CollectionsList } from './List/CollectionsList';
import { CollectionsTable } from './Table/CollectionsTable';
import { useTranslation } from '@/localization';
import { useCollectionsFilterState } from '@/states/explorer/hooks/useCollectionsFilterState';
import styles from './CollectionsExplorer.module.scss';

type CollectionsExplorerProps = {
    gameID?: string,
    popularCollections?: boolean
}

export function CollectionsExplorer({ gameID, popularCollections }: CollectionsExplorerProps) {
    const { t } = useTranslation();
    const filterState = useCollectionsFilterState({
        gameID,
        popular: popularCollections
    });

    const renderEmpty = useCallback(() => {
        return <EmptyResult
            title={t('Nothing found')}
            text={t('We couldn\'t find anything with this criteria')}
        />;
    }, [t]);

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
                {t('View collections')}
            </Button>}
        </div>
    );
}
