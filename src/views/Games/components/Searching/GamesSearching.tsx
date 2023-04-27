import { useState } from 'react';
import styles from './GamesSearching.module.scss';
import { Title, InputSearch, Select, Search } from '@/uikit';
import { GameCard } from '@/components/Game';
import { useGamesQuery } from '@/states/game/hooks/useGamesQuery';
const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 3' },
    { value: 'option5', label: 'Option 3' },
    { value: 'option6', label: 'Option 3' },
    { value: 'option7', label: 'Option 3' },
    { value: 'option8', label: 'Option 3' },
    { value: 'option9', label: 'Option 3' },
];

const SKELETON_GAMES = 4;

export function GamesSearching() {
    const { games, isLoading } = useGamesQuery({ filter: {} });
    const [search, setSearch] = useState('');
    const [option, setOption] = useState('');


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
                    options={options}
                    value={option}
                    placeholder={'Выбрать'}
                    onChange={(val) => setOption(val)}
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
