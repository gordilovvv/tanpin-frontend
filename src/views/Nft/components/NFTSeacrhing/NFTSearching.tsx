import { CatalogHead } from '@/components/Layout';
import { InputSearch, Select, Button, Filter } from '@/uikit';
import { NFTSort } from '@/states/nft/types';
import styles from './NFTSearching.module.scss';

type NFTSearchingProps = {
}

const options: { value: `${NFTSort}`, label: string }[] = [
    { value: 'TRENDING', label: 'Trending' },
    { value: 'RECENTLY_ADDED', label: 'Recently Added' },
];

export function NFTSearching({ }: NFTSearchingProps) {
    return (
        <div>
            <CatalogHead
                title='NFT'
                description='Explore NFT collections from your favorite games'
                addonBottom={<div className={styles.filter}>
                    <Button
                        iconSlot={<Filter />}
                        view="secondary"
                    >Filters</Button>

                    <InputSearch
                        placeholder="Search"
                        onChange={() => null}
                    // value={typedSearchQuery}
                    // onChange={typeSearch}
                    />

                    <Select
                        options={options}
                        // selectedValue={activeSort}
                        onChange={() => null}
                    />
                </div>}
            />
        </div>
    );
}