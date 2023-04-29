import { useState } from 'react';
import { Title, Select } from '@/uikit';
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
            <div className={styles.head}>
                <div className={styles.left}>
                    <Title className={styles.title}>Collections</Title>

                    <div className={styles.text}>
                        Explore NFT collections from your favorite games
                    </div>
                </div>

                <div className={styles.right}>
                    <Select
                        options={options}
                        selectedValue={sort}
                        onChange={(value) => setSort(value as CollectionsSort)}
                    />
                </div>
            </div>

            <div className={styles.inner}>
                <CollectionTable
                    filter={{ sort }}
                    hasMoreButton={true}
                />
            </div>

        </div >
    );

}
