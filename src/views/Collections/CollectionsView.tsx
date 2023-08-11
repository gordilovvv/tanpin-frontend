import { Select } from '@/uikit';
import { CatalogHead, Container, PageWrapper } from '@/components/Layout';
import { CollectionsSort } from '@/states/collection/types';
import { CollectionsExplorer } from '@/components/Explorer';
import { useCollectionsFilterState } from '@/states/explorer/hooks/useCollectionsFilterState';
import { useCollectionsFilterActions } from '@/states/explorer/hooks/useCollectionsFilterActions';
import styles from './CollectionsView.module.scss';

export function CollectionsView() {
    const { sort } = useCollectionsFilterState();
    const { handleSort } = useCollectionsFilterActions();

    const options: { value: CollectionsSort; label: string }[] = [
        { value: CollectionsSort.TRENDING, label: 'Trending' },
        { value: CollectionsSort.RECENTLY_ADDED, label: 'Recently Added' },
    ];

    return (
        <PageWrapper>
            <Container space>
                <div className={styles.wrap}>
                    <CatalogHead
                        title="Collections"
                        description="Explore NFT collections from your favorite games"
                        addonRight={
                            <div className={styles.select}>
                                <Select
                                    options={options}
                                    selectedValue={sort}
                                    onChange={handleSort}
                                />
                            </div>
                        }
                    />

                    <CollectionsExplorer />
                </div>
            </Container>
        </PageWrapper>
    );
}
