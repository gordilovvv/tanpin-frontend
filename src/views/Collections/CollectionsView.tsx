import { Select } from '@/uikit';
import { CatalogHead, Container, PageWrapper } from '@/components/Layout';
import { CollectionsSort } from '@/states/collection/types';
import { CollectionsExplorer } from '@/components/Explorer';
import { useTranslation } from '@/localization';
import { useCollectionsFilterState } from '@/states/explorer/hooks/useCollectionsFilterState';
import { useCollectionsFilterActions } from '@/states/explorer/hooks/useCollectionsFilterActions';
import styles from './CollectionsView.module.scss';

export function CollectionsView() {
    const { t } = useTranslation();
    const { sort } = useCollectionsFilterState();
    const { handleSort } = useCollectionsFilterActions();

    const options: { value: CollectionsSort; label: string }[] = [
        { value: CollectionsSort.TRENDING, label: t('Trending') },
        { value: CollectionsSort.RECENTLY_ADDED, label: t('Recently Added') },
    ];

    return (
        <PageWrapper>
            <Container space>
                <div className={styles.wrap}>
                    <CatalogHead
                        title={t('Collections')}
                        description={t('Explore NFT collections from your favorite games')}
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
