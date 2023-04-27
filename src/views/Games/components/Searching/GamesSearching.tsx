import styles from './GamesSearching.module.scss';
import { Title, Input, Search } from '@/uikit';
import { GameCard } from '@/components/Game';
import { useGamesQuery } from '@/states/game/hooks/useGamesQuery';
// const options = [
//     { value: 'option1', label: 'Option 1' },
//     { value: 'option2', label: 'Option 2' },
//     { value: 'option3', label: 'Option 3' },
// ];

const SKELETON_GAMES = 4;

export function GamesSearching() {
    const { games, isLoading } = useGamesQuery({ filter: {} });

    return (
        <div>

            <Title className={styles.title}>
                Games

            </Title >

            {/* <Select
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
            /> */}


            <div className={styles.text}>Explore NFT collections from your favorite games</div>

            <Input
                icon={<Search />}
                placeholder="Search"
                className={styles.input}

            />

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
