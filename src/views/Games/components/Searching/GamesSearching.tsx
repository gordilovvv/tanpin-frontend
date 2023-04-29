import { InputSearch, Select } from '@/uikit';
import { CatalogHead } from '@/components/Layout';
import { GameCard } from '@/components/Game';
import { useGamesStore } from '@/states/game/store';
import { useGamesQuery } from '@/states/game/hooks/useGamesQuery';
import { GamesSort } from '@/states/game/types';
import styles from './GamesSearching.module.scss';

const SKELETON_GAMES = 4;

export function GamesSearching() {
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

    const renderList = () => {
        if (isLoading) {
            return <div className={styles.list}>
                {[...Array(SKELETON_GAMES).keys()].map(index => (
                    <GameCard key={index} />
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
            Collections not found
        </div>;
    };

    return (
        <div className={styles.wrap}>
            <CatalogHead
                title='Games'
                description='Explore NFT collections from your favorite games'
                addonBottom={<div className={styles.filter}>
                    <InputSearch
                        placeholder="Search"
                        value={typedSearchQuery}
                        onChange={typeSearch}
                    />

                    <Select
                        options={options}
                        selectedValue={activeSort}
                        onChange={(sort) => changeSort(sort as GamesSort)}
                    />
                </div>}
            />

            {renderList()}
        </div>
    );
}
