import { HTMLAttributes, memo, useMemo } from 'react';
import { Button, Select } from '@/uikit';
import { FilterItem } from './FilterItem/FilterItem';
import { PriceFilter } from './PriceFilter/PriceFilter';
import { AttributesFilter } from './AttributesFilter/AttributesFilter';
import { useTranslation } from '@/localization';
import { useTokensFilterState } from '@/states/explorer/hooks/useTokensFilterState';
import { useTokensFilterActions } from '@/states/explorer/hooks/useTokensFilterActions';
import { TokensFilterState } from '@/states/explorer/TokensFilterStore';
import { convertToHashmap } from '@/utils/convertToHashmap';
import { ActiveAttributesHashMap } from './types';
import { Collection } from '@/states/collection/types';
import { NFTExplorerCategory } from '@/states/explorer/types';
import classNames from 'classnames';
import styles from './Filter.module.scss';

type FilterProps = {
    explorer: `${NFTExplorerCategory}`,
    filterOnButton?: boolean,
    collection?: Collection,
    sticky?: boolean,
    onFilterApply?: () => void,
    onFilterReset?: () => void
} & HTMLAttributes<HTMLDivElement>;

export const Filter = memo(({ explorer, collection, filterOnButton = false, sticky, className, onFilterApply, onFilterReset, ...props }: FilterProps) => {
    const { t } = useTranslation();
    const {
        applyFilters,
        resetFilters,
        handleMinPrice,
        handleMaxPrice,
        handleStatus,
        handleAddAttribute,
        handleRemoveAttribute
    } = useTokensFilterActions({ filterImmediately: !filterOnButton });

    const {
        minPrice,
        maxPrice,
        status,
        attributes: activeAttributes
    } = useTokensFilterState();

    const activeAttributesHashMap = useMemo(
        () => convertToHashmap(activeAttributes) as ActiveAttributesHashMap,
        [activeAttributes]
    );

    const statuses = useMemo<{ value: TokensFilterState['status'], label: string }[]>(() => {
        const options = [
            {
                value: 'ALL',
                label: t('All')
            },
            {
                value: 'FIXED_PRICE',
                label: t('Buy now')
            },
            {
                value: 'AUCTION',
                label: t('Auction')
            }
        ] as { value: TokensFilterState['status'], label: string }[];

        if (explorer === 'ownership') {
            options.unshift({
                value: 'NOT_FOR_SALE',
                label: t('Not for sale')
            });
        }

        return options;
    }, [explorer, t]);

    const handleApplyFilters = () => {
        applyFilters();
        onFilterApply?.();
    };

    const handleResetFilters = () => {
        resetFilters();
        onFilterReset?.();
    };

    return (
        <div
            className={classNames(styles.filter, className, {
                [styles.sticky]: sticky
            })}
            {...props}
        >
            <div className={styles.content}>
                {explorer !== 'ownershipSale' && <FilterItem title={t('Status')}>
                    <Select
                        placeholderText={t('Status')}
                        selectedValue={status}
                        options={statuses}
                        onChange={handleStatus}
                    />
                </FilterItem>}

                {/* TODO: Replace USDT with dynamic variable */}
                <FilterItem
                    title={t('Price')}
                    addon='USDT'
                >
                    <PriceFilter
                        min={minPrice}
                        max={maxPrice}
                        onMinPriceChange={handleMinPrice}
                        onMaxPriceChange={handleMaxPrice}
                    />
                </FilterItem>

                {collection?.attributes.length ? <FilterItem title={t('Properties')}>
                    <div className={styles.inner}>
                        <div className={styles.group}>
                            {
                                collection.attributes.map(({ traitType, values }) => {
                                    return (
                                        <AttributesFilter
                                            key={traitType}
                                            values={values}
                                            traitType={traitType}
                                            activeAttributes={activeAttributesHashMap}
                                            onAddAttribute={handleAddAttribute}
                                            onRemoveAttribute={handleRemoveAttribute}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </FilterItem> : null}

                {filterOnButton && <div className={styles.buttons}>
                    <div className={styles.buttonsGrid}>
                        <Button
                            view='secondary'
                            onClick={handleResetFilters}
                        >
                            {t('Reset all')}
                        </Button>

                        <Button
                            view='primary'
                            onClick={handleApplyFilters}
                        >
                            {t('Apply')}
                        </Button>
                    </div>
                </div>}
            </div>
        </div >
    );
});

Filter.displayName = 'Filter';