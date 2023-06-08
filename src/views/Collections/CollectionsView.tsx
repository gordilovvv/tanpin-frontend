import { Container, PageWrapper, CatalogHead } from '@/components/Layout';

import { useState } from 'react';
import { Select } from '@/uikit';
import { CollectionTable } from '@/components/Collections';
import { CollectionsSort } from '@/states/collection/types';
import styles from './CollectionsView.module.scss';

export function CollectionsView() {
    const [sort, setSort] = useState<`${CollectionsSort}`>('TRENDING');

    const options: { value: `${CollectionsSort}`; label: string }[] = [
        { value: 'TRENDING', label: 'Trending' },
        { value: 'RECENTLY_ADDED', label: 'Recently Added' },
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
                                    onChange={(value) => setSort(value as CollectionsSort)}
                                />
                            </div>
                        }
                    />

                    <div className={styles.inner}>
                        <CollectionTable
                            filter={{ sort }}
                            hasMoreButton
                        />
                    </div>
                </div>
            </Container>
        </PageWrapper>
    );
}
