import { useCallback, useEffect, useRef, useState } from 'react';
import { Select, Button, Filter as FilterIcon } from '@/uikit';
import { Filter } from './Filter/Filter';
import { NFTGrid } from './Grid/NFTGrid';
import { EmptyResult } from '../EmptyResult/EmptyResult';
import { SearchInput } from '@/components/SearchInput';
import { MobileFilter } from '@/components/Modals';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useOpenedState } from '@/hooks/useOpenedState';
import { useScrollEffect } from '@/hooks/useScrollEffect';
import { useTokensFilterState } from '@/states/explorer/hooks/useTokensFilterState';
import { useTokensFilterActions } from '@/states/explorer/hooks/useTokensFilterActions';
import { Collection } from '@/states/collection/types';
import { NFTExplorerCategory } from '@/states/explorer/types';
import { NFTSort, initialTokensFilterState } from '@/states/explorer/TokensFilterStore';
import styles from './NFTExplorer.module.scss';

type NFTExplorerProps = {
    type: `${NFTExplorerCategory}`,
    collection?: Collection
    ownerAddress?: string
}

// TODO:
// 1. ДОБАВИТЬ ПОДДЕРЖКУ URL
// useNFTFilterDefaultsFromURL();
// useTokensFilterQueryParams();
export function NFTExplorer({ type, collection, ownerAddress }: NFTExplorerProps) {
    const isPhone = useMediaQuery('(max-width: 1000px)');
    const wrapperRef = useRef<HTMLDivElement>(null);

    const mobileFilter = useOpenedState();
    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const filterState = useTokensFilterState();
    const { handleSearch, handleSort, handleReplaceFilterState } = useTokensFilterActions({ filterImmediately: true });

    // After filter change - scroll to start
    useScrollEffect(
        wrapperRef,
        filterState.hash
    );

    // Reset filter state on unmount
    useEffect(() => {
        return () => {
            handleReplaceFilterState(initialTokensFilterState);
        };
    }, []);

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
            mobileFilter.isOpen
                ? mobileFilter.close()
                : mobileFilter.open();
        } else {
            setIsFilterVisible(isVisible => !isVisible);
        }
    }, [mobileFilter, setIsFilterVisible]);

    return (
        <div
            ref={wrapperRef}
            className={styles.wrapper}
        >
            <div className={styles.top}>
                <Button
                    iconSlot={<FilterIcon />}
                    view="secondary"
                    onClick={handleFilterToggle}
                >
                    Filters
                </Button>

                <SearchInput
                    value={filterState.search}
                    placeholder="Search"
                    onChange={handleSearch}
                />

                <Select
                    placeholderText="Sort"
                    onChange={handleSort}
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
                            explorer={type}
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

            {isPhone && <MobileFilter
                isOpen={mobileFilter.isOpen}
                explorer={type}
                collection={collection}
                onClose={mobileFilter.close}
            />}
        </div>
    );
}