import { useState } from 'react';
import { Select, InputSearch } from '@/uikit';
import { Container, PageWrapper } from '@/components/Layout';
import { CollectionTable } from '@/components/Collections';
import { GameHead } from './components/Head/GameHead';
import { CollectionsSort } from '@/states/collection/types';
import { useParams } from 'react-router-dom';
import { useGameQuery } from '@/states/game/hooks/useGameQuery';
import styles from './SingleGameView.module.scss';

export function SingleGameView() {
    const { gameID } = useParams();
    if (typeof gameID !== 'string') {
        throw new TypeError('typeof gameID is not a string!');
    }
    const { game } = useGameQuery(gameID as string);

    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<`${CollectionsSort}`>('TRENDING');

    const filter = { search, sort };

    const options: { value: `${CollectionsSort}`; label: string }[] = [
        { value: 'TRENDING', label: 'Trending' },
        { value: 'RECENTLY_ADDED', label: 'Recently Added' },
    ];

    return (
        <PageWrapper hasPaddingTop={false}>
            <div className={styles.wrapper}>
                <GameHead game={game} />

                <Container>
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
                </Container>

                <Container>
                    <CollectionTable
                        filter={filter}
                        hasMoreButton
                        gameID={gameID}
                    />
                </Container>
            </div>
        </PageWrapper>
    );
}
