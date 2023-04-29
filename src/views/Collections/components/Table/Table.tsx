import { useState } from 'react';
import { Select } from '@/uikit';
import { CatalogHead } from '@/components/Layout';
import { CollectionTable } from '@/components/Collections';
import { CollectionsSort } from '@/states/collection/types';
import styles from './Table.module.scss';

export function Table() {
    const [sort, setSort] = useState<`${CollectionsSort}`>('TRENDING');

    const options: { value: `${CollectionsSort}`, label: string }[] = [
        { value: 'TRENDING', label: 'Trending' },
        { value: 'RECENTLY_ADDED', label: 'Recently Added' },
    ];

    return (
        <div className={styles.wrap}>
            <CatalogHead
                title='Collections'
                description='Explore NFT collections from your favorite games'
                addonRight={<div className={styles.select}>
                    <Select
                        options={options}
                        selectedValue={sort}
                        onChange={(value) => setSort(value as CollectionsSort)}
                    />
                </div>}
            />

            <div className={styles.inner}>
                <CollectionTable
                    filter={{ sort }}
                    hasMoreButton={true}
                />
            </div>

        </div >
    );

}
