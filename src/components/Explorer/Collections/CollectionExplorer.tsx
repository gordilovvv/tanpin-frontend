import { useState, useMemo } from 'react';
import { Select, InputSearch } from '@/uikit';
import { CollectionTable } from '@/components/Collections';
import { CollectionsSort } from '@/states/collection/types';
import styles from './CollectionExplorer.module.scss';

// из-за того, что у нас этот компонент эксплорер в дургом месте, у нас стремные импорты из другого модуля (@/components/Collections) я бы поэтому подумал над расположением эксплореров прям там же (@/components/Collections)
type CollectionExplorerProps = {
    gameID?: string
    userAddress?: string
}


export function CollectionExplorer({ gameID, userAddress }: CollectionExplorerProps) {
    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<`${CollectionsSort}`>('TRENDING');

    const filter = useMemo(() => ({ search, sort, gameID, userAddress }), [search, sort, gameID, userAddress]);

    const options: { value: `${CollectionsSort}`; label: string }[] = [
        { value: 'TRENDING', label: 'Trending' },
        { value: 'RECENTLY_ADDED', label: 'Recently Added' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <InputSearch
                    value={search}
                    onChange={(val) => setSearch(val)}
                />

                <Select
                    options={options}
                    selectedValue={sort}
                    onChange={(value) => setSort(value as CollectionsSort)}
                />
            </div>

            <CollectionTable
                filter={filter}
                hasMoreButton
            />

        </div>
    );
}
