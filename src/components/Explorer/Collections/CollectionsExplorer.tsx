import { useState, useMemo } from 'react';
import { Select } from '@/uikit';
import { SearchInput } from '@/components/SearchInput';
import { CollectionTable } from '@/components/Collections';
import { CollectionsSort } from '@/states/collection/types';
import styles from './CollectionsExplorer.module.scss';

type CollectionsExplorerProps = {
    gameID?: string
    userAddress?: string
}

export function CollectionsExplorer({ gameID, userAddress }: CollectionsExplorerProps) {
    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<CollectionsSort>(CollectionsSort.TRENDING);

    const filter = useMemo(() => ({
        search,
        sort,
        gameID,
        userAddress
    }), [search, sort, gameID, userAddress]);

    const options: { value: CollectionsSort; label: string }[] = [
        { value: CollectionsSort.TRENDING, label: 'Trending' },
        { value: CollectionsSort.RECENTLY_ADDED, label: 'Recently Added' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <SearchInput
                    value={search}
                    onChange={(val) => setSearch(val)}
                />

                <Select
                    options={options}
                    selectedValue={sort}
                    onChange={(value) => setSort(value as CollectionsSort)}
                />
            </div>

            <CollectionTable filter={filter} />
        </div>
    );
}
