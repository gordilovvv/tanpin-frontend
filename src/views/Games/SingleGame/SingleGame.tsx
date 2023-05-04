import { useState } from 'react';
import { Select, InputSearch } from '@/uikit';
import { Container } from '@/components/Layout';
import { CollectionTable } from '@/components/Collections';
import { GameHead } from './components/head/GameHead';
import { CollectionsSort } from '@/states/collection/types';
import { useParams } from 'react-router-dom';
import { useGameQuery } from '@/states/game/hooks/useGameQuery';
import styles from './SingleGame.module.scss';

export function SingleGame() {
    const { id } = useParams();
    const { game } = useGameQuery(id as string);

    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<`${CollectionsSort}`>('TRENDING');

    const options: { value: `${CollectionsSort}`; label: string }[] = [
        { value: 'TRENDING', label: 'Trending' },
        { value: 'RECENTLY_ADDED', label: 'Recently Added' },
    ];

    return (
        <>
            <GameHead game={game} />

            <Container
                space
                className={styles.wrapper}
            >
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
                    filter={{ search, sort }}
                    hasMoreButton
                />
            </Container>
        </>
    );
}
