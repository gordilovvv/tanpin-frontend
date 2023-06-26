import { useCallback, useEffect, useRef, useState } from 'react';
import { InputSearch, Select, Button, Filter as FilterIcon, Modal } from '@/uikit';
import { Filter } from './Filter/Filter';
import { NFTGrid } from './Grid/NFTGrid';
import { EmptyResult } from '../EmptyResult/EmptyResult';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useOpenedState } from '@/hooks/useOpenedState';
import { useTokensFilterState } from '@/states/explorer/hooks/useTokensFilterState';
import { useTokensFilterActions } from '@/states/explorer/hooks/useTokensFilterActions';
import { NFTSort } from '@/states/explorer/TokensFilterStore';
import { Collection } from '@/states/collection/types';
import styles from './NFTExplorer.module.scss';

type NFTExplorerProps = {
    collection?: Collection
    ownerAddress?: string
}

// TODO:
// 1. ДОБАВИТЬ ПОДДЕРЖКУ URL
// 2. ДОБАВИТЬ КНОПКУ В МОБИЛЬНОМ ФИЛЬТРЕ
export function NFTExplorer({ collection, ownerAddress }: NFTExplorerProps) {
    const filterState = useTokensFilterState();
    const { setSearch, setSort } = useTokensFilterActions();

    // useNFTFilterDefaultsFromURL();
    // useTokensFilterQueryParams();

    const wrapperRef = useRef<HTMLDivElement>(null);
    const isPhone = useMediaQuery('(max-width: 1000px)');
    const mobileFilterState = useOpenedState();
    const [isFilterVisible, setIsFilterVisible] = useState(true);

    // After filter change - scroll to start
    useEffect(() => {
        if (wrapperRef.current) {
            const top = wrapperRef.current.getBoundingClientRect().top;

            if (top < 0) {
                window.scrollTo({
                    top: top + window.scrollY - 100,
                    behavior: 'smooth'
                });
            }
        }
    }, [filterState]);

    // After filter change - close modal
    useEffect(() => {
        if (mobileFilterState.isOpen) {
            mobileFilterState.close();
        }
    }, [filterState]);

    const renderEmpty = useCallback(() => {
        return <EmptyResult
            title="Nothing found"
            text="We couldn't find anything with this criteria"
        />;
    }, []);

    const sortOptions: { value: NFTSort; label: string }[] = [
        { value: NFTSort.RECENTLY_ADDED, label: 'Recently Added' },
        { value: NFTSort.HIGH_PRICE_FIRST, label: 'High Price First' },
        { value: NFTSort.LOW_PRICE_FIRST, label: 'Low Price First' },
    ];

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
        <div
            className={styles.wrapper}
            ref={wrapperRef}
        >
            <div className={styles.top}>
                <Button
                    iconSlot={<FilterIcon />}
                    view="secondary"
                    onClick={handleFilterToggle}
                >
                    Filters
                </Button>

                <InputSearch
                    value={filterState.search}
                    placeholder="Search"
                    onChange={setSearch}
                />

                <Select
                    placeholderText="Sort"
                    onChange={setSort}
                    selectedValue={filterState.sort}
                    options={sortOptions}
                />
            </div>

            <div className={styles.main}>
                {
                    !isPhone
                    && isFilterVisible
                    && <div className={styles.filterWrap}>
                        <Filter
                            collection={collection}
                            sticky
                        />
                    </div>
                }

                <div className={styles.listWrap}>
                    <NFTGrid
                        filter={filterState}
                        empty={renderEmpty}
                        ownerAddress={ownerAddress}
                        collectionID={collection?.ID}
                    />
                </div>
            </div>

            {isPhone && <Modal
                isOpen={mobileFilterState.isOpen}
                onClose={mobileFilterState.close}
            >
                <Filter collection={collection} />
            </Modal>}
        </div>
    );
}