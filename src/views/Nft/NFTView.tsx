
import { Container, PageWrapper } from '@/components/Layout';
import { CatalogHead } from '@/components/Layout';
import { Filter } from '@/components/Filter';
import { InputSearch, Select, Button, Modal, Filter as FilterIcon } from '@/uikit';
import { NFTSort } from '@/states/nft/types';
import { useCallback, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useOpenedState } from '@/hooks/useOpenedState';
import { NFTGrid } from '@/components/Nft';
import { useFilterStore } from '@/states/collection/filterStore';
import { useFilterStoreActions } from '@/states/collection/hooks/useFilterStoreActions';
import styles from './NFTView.module.scss';

const sortOptions: { value: `${NFTSort}`; label: string }[] = [
    { value: 'RECENTLY_ADDED', label: 'Recently Added' },
    { value: 'HIGH_PRICE_FIRST', label: 'High Price First' },
    { value: 'LOW_PRICE_FIRST', label: 'Low Price First' },
];



export function NFTView() {
    const isPhone = useMediaQuery('(max-width: 1000px)');

    const filterState = useFilterStore(({ collectionID, minPrice, maxPrice, attributes, search, sort, status }) => ({
        collectionID,
        minPrice,
        maxPrice,
        attributes,
        search,
        sort,
        status
    }));

    const { setSearch, setSort } = useFilterStoreActions();

    const [isFilterVisible, setIsFilterVisible] = useState(true);

    const mobileFilterState = useOpenedState();

    const handleFilterToggle = useCallback(() => {
        if (isPhone) {
            mobileFilterState.isOpen
                ? mobileFilterState.close()
                : mobileFilterState.open();
        } else {
            setIsFilterVisible(isVisible => !isVisible);
        }
    }, [mobileFilterState, setIsFilterVisible]);

    return (
        <PageWrapper>
            <Container
                space
                className={styles.wrapper}
            >
                <CatalogHead
                    title='NFT'
                    description='Explore NFT collections from your favorite games'
                    addonBottom={<div className={styles.filter}>
                        <Button
                            iconSlot={<FilterIcon />}
                            view="secondary"
                            onClick={handleFilterToggle}
                        >Filters</Button>

                        <InputSearch
                            value={filterState.search}
                            placeholder="Search"
                            onChange={setSearch}
                        />

                        <Select
                            onChange={setSort}
                            selectedValue={filterState.sort}
                            options={sortOptions}
                        />
                    </div>}
                />

                <div className={styles.main}>
                    {
                        !isPhone
                        && isFilterVisible
                        && <div className={styles.filterWrap}>
                            <Filter />
                        </div>
                    }

                    <div className={styles.listWrap}>
                        <NFTGrid
                            filter={filterState}
                        />
                    </div>
                </div>

                {isPhone && <Modal
                    isOpen={mobileFilterState.isOpen}
                    onClose={mobileFilterState.close}
                >
                    <Filter />
                </Modal>}


            </Container>
        </PageWrapper >
    );
}