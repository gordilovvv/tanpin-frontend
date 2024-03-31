import { CollectionCard, CollectionCardSkeleton } from '../Card/CollectionCard';
import { ErrorResult } from '@/components/Explorer';
import { fetchCollectionsList } from '@/states/explorer/fetch/fetchCollectionsList';
import { CollectionsFilterState } from '@/states/explorer/CollectionsFilterStore';
import useSWRImmutable from 'swr/immutable';
import { useTranslation } from '@/localization';
import { delayExecution } from '@/utils/delayExecution';
import { times } from 'lodash';
import styles from './CollectionsGrid.module.scss';

type CollectionsGridProps = {
    filter?: CollectionsFilterState
}

export function CollectionsGrid({ filter }: CollectionsGridProps) {
    const { t } = useTranslation();
    const { data, error, isLoading } = useSWRImmutable(['collections.list', filter], async () => {
        const collections = await delayExecution(() => fetchCollectionsList({ filter }), 200);

        return collections;
    }, { revalidateOnFocus: true });

    if (error) {
        return (<ErrorResult
            title={t('An error occurred')}
            text={t('There was an error while fetching')}
        />);
    }

    if (isLoading || !data) {
        return (
            <div className={styles.grid}>
                {times(4).map(
                    index => <CollectionCardSkeleton key={index} />
                )}
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {data.items.map(collection => <CollectionCard
                key={`${collection.gameID}#${collection.ID}`}
                collection={collection}
            />)}
        </div>
    );
}