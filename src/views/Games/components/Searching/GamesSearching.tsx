import { useState } from 'react';
import styles from './GamesSearching.module.scss';
import { Title, InputSearch, Select, Search } from '@/uikit';
import { GameCard } from '@/components/Game';
import { useGamesQuery } from '@/states/game/hooks/useGamesQuery';
const options = [
    { value: 'TRENDING', label: 'Trending' },
    { value: 'RECENTLY_ADDED', label: 'Recently Added' },
];

const SKELETON_GAMES = 4;

export function GamesSearching() {
    const { games, isLoading } = useGamesQuery({ filter: {} });
    const [search, setSearch] = useState('');
    const [option, setOption] = useState('');

    const changeOption = (value) => {
        setOption(value);
    };


    return (
        <div>
            <Title className={styles.title}>
                Games
                {search}
            </Title >

            <div className={styles.text}>Explore NFT collections from your favorite games</div>

            <div className={styles.header}>
                <InputSearch
                    icon={<Search />}
                    placeholder="Search"
                    className={styles.input}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    timeout={500}

                />

                <Select
                    SelectOption={options}
                    value={option}
                    placeHolderText={'Выбрать'}
                    onOptionChange={changeOption}
                />
            </div>

            <div className={styles.inner}>
                {
                    isLoading
                        ?
                        ([...Array(SKELETON_GAMES).keys()].map(i => <GameCard key={i} />))
                        : games?.map(game => (
                            <GameCard
                                key={game.ID}
                                game={game}
                            />
                        ))}
            </div>

        </div>
    );
}
