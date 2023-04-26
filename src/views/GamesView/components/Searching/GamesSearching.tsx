import styles from './GamesSearching.module.scss';
import { Title, Input, Search } from '@/uikit';
import { GameCard } from '@/components/Game';

import { useInput } from '@/hooks/useInput';

// const options = [
//     { value: 'option1', label: 'Option 1' },
//     { value: 'option2', label: 'Option 2' },
//     { value: 'option3', label: 'Option 3' },
// ];

export function GamesSearching() {
    const nameInput = useInput('');

    return (
        <div>

            <Title className={styles.title}>
                Games  {nameInput.value}
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
                {...nameInput}
            />

            <div className={styles.inner}>
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
            </div>

        </div>
    );
}