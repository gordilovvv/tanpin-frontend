import { useState } from 'react';
import styles from './Table.module.scss';
import { CollectionTable } from '@/components/Collections';
import { Title, Select } from '@/uikit';

const options = [
    { value: 'TRENDING', label: 'Trending' },
    { value: 'RECENTLY_ADDED', label: 'Recently Added' },
];

export function Table() {
    const [option, setOption] = useState('');

    const selectChange = (value: string) => {
        setOption(value);
    };

    return (
        <div>
            <div className={styles.headerWrapper}>
                <div className={styles.left}>
                    <Title className={styles.title}>Collections</Title>

                    <div className={styles.text}>
                        Explore NFT collections from your favorite games
                    </div>
                </div>

                <Select
                    className={styles.select}
                    SelectOption={options}
                    value={option}
                    placeHolderText={'Выбрать'}
                    onOptionChange={selectChange}
                />
            </div>

            <div className={styles.inner}>
                <CollectionTable sort={option} />
            </div>

        </div >
    );

}
