import { useCallback } from 'react';
import { Select } from '@/uikit';
import { EmptyResult } from '@/components/Explorer';
import { GameCard, GameCardSkeleton } from '@/components/Game';
import { CatalogHead, Container, PageWrapper } from '@/components/Layout';
import { SearchInput } from '@/components/SearchInput';
import { useGamesStore } from '@/states/game/store';
import { useGamesQuery } from '@/states/game/hooks/useGamesQuery';
import { GamesSort } from '@/states/game/types';
import times from 'lodash/times';
import styles from './GamesView.module.scss';

const SKELETON_GAMES = 4;

export function GamesView() {
    const [activeSort, typedSearchQuery, changeSort, typeSearch] = useGamesStore(state => [
        state.activeSort,
        state.typedSearchQuery,
        state.changeSort,
        state.typeSearch
    ]);

    const { games, isLoading } = useGamesQuery({
        filter: {
            sort: activeSort,
            search: typedSearchQuery
        }
    });

    const options: { value: `${GamesSort}`, label: string }[] = [
        { value: 'TRENDING', label: 'Trending' },
        { value: 'RECENTLY_ADDED', label: 'Recently Added' },
    ];

    const renderList = useCallback(() => {
        if (isLoading) {
            return <div className={styles.list}>
                {times(SKELETON_GAMES).map(index => (
                    <GameCardSkeleton key={index} />
                ))}
            </div>;
        }

        if (games?.length) {
            return <div className={styles.list}>
                {games.map(game => (
                    <GameCard
                        key={game.ID}
                        game={game}
                    />
                ))}
            </div>;
        }

        return <div className={styles.empty}>
            <EmptyResult
                title='Nothing found'
                text="We couldn't find any games"
            />
        </div>;
    }, [games, isLoading]);

    return (
        <PageWrapper>

            <Container space>
                <div className={styles.wrap}>
                    <CatalogHead
                        title='Games'
                        description='Explore NFT collections from your favorite games'
                        addonBottom={
                            <div className={styles.filter}>
                                <SearchInput
                                    value={typedSearchQuery}
                                    placeholder="Search"
                                    onChange={typeSearch}
                                />

                                <Select
                                    options={options}
                                    selectedValue={activeSort}
                                    onChange={changeSort}
                                />
                            </div>
                        }
                    />

                    {renderList()}
                </div>
            </Container>
        </PageWrapper >
    );
}
