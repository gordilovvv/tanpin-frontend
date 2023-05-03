import { useState } from 'react';
import styles from './SingleGame.module.scss';
import { GameHead } from './components/head/GameHead';
import { CollectionsSort } from '@/states/collection/types';
import { CollectionTable } from '@/components/Collections';
import { Select } from '@/uikit';
import { useGameQuery } from '@/states/game/hooks/useGameQuery';

import { Container } from '@/components/Layout';
import { InputSearch } from '@/uikit';
import { useParams } from 'react-router-dom';

export function SingleGame() {
    const { id } = useParams();
    const { game } = useGameQuery(id!);

    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<`${CollectionsSort}`>('TRENDING');

    const options: { value: `${CollectionsSort}`; label: string }[] = [
        { value: 'TRENDING', label: 'Trending' },
        { value: 'RECENTLY_ADDED', label: 'Recently Added' },
    ];

    return (
        <div>
            <GameHead game={game} />

            <Container space>
                <div className={styles.header}>
                    <InputSearch value={search} onChange={(val) => setSearch(val)} />

                    <Select
                        options={options}
                        selectedValue={sort}
                        onChange={(value) => setSort(value as CollectionsSort)}
                    />
                </div>

                <CollectionTable filter={{ search, sort }} hasMoreButton={true} />
            </Container>
        </div>
    );
}
