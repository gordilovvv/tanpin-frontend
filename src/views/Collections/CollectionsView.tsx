import { Select } from '@/uikit';
import { CatalogHead, Container, PageWrapper } from '@/components/Layout';
import { CollectionsGrid } from '@/components/Collections';
import { CollectionsSort } from '@/states/collection/types';
import { useTranslation } from '@/localization';
import { useCollectionsFilterState } from '@/states/explorer/hooks/useCollectionsFilterState';
import { useCollectionsFilterActions } from '@/states/explorer/hooks/useCollectionsFilterActions';
import styles from './CollectionsView.module.scss';

export function CollectionsView() {
    const { t } = useTranslation();
    const filter = useCollectionsFilterState();
    const { handleSort } = useCollectionsFilterActions();

    const options: { value: CollectionsSort; label: string }[] = [
        { value: CollectionsSort.NEWEST, label: t('Newest') },
        { value: CollectionsSort.OLDEST, label: t('Oldest') },
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
                                    selectedValue={filter.sort}
                                    onChange={handleSort}
                                />
                            </div>
                        }
                    />

                    <CollectionsGrid filter={filter} />
                </div>
            </Container>
        </PageWrapper>
    );
}
