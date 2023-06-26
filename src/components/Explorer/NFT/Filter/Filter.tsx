import { HTMLAttributes, useMemo } from 'react';
import { Select } from '@/uikit';
import { FilterItem } from './FilterItem/FilterItem';
import { PriceFilter } from './PriceFilter/PriceFilter';
import { AttributesFilter } from './AttributesFilter/AttributesFilter';
import { useTokensFilterState } from '@/states/explorer/hooks/useTokensFilterState';
import { useTokensFilterActions } from '@/states/explorer/hooks/useTokensFilterActions';
import { convertToHashmap } from '@/utils/convertToHashmap';
import { ActiveAttributesHashMap } from './types';
import { NFTSaleStatus } from '@/states/types';
import { Collection } from '@/states/collection/types';
import classNames from 'classnames';
import styles from './Filter.module.scss';

type FilterProps = {
    collection?: Collection
    sticky?: boolean
} & HTMLAttributes<HTMLDivElement>;

export function Filter({ collection, sticky, className, ...props }: FilterProps) {
    const {
        setStatus,
        setMaxPrice,
        setMinPrice
    } = useTokensFilterActions();

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

    const statusOptions: { value: typeof status, label: string }[] = [
        {
            value: NFTSaleStatus.FIXED_PRICE,
            label: 'Buy now'
        },
        {
            value: NFTSaleStatus.AUCTION,
            label: 'Auction'
        }
    ];

    return (
        <div
            className={classNames(styles.filter, className, {
                [styles.sticky]: sticky
            })}
            {...props}
        >
            <div className={styles.content}>
                <FilterItem title='Status'>
                    <Select
                        placeholderText='Status'
                        selectedValue={status}
                        options={statusOptions}
                        onChange={setStatus}
                    />
                </FilterItem>

                {/* TODO: Replace USDT with dynamic variable */}
                <FilterItem
                    title='Price'
                    addon='USDT'
                >
                    <PriceFilter
                        initialMin={minPrice}
                        initialMax={maxPrice}
                        onMinPriceChange={setMinPrice}
                        onMaxPriceChange={setMaxPrice}
                    />
                </FilterItem>

                {collection?.attributes && <FilterItem title='Properties'>
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
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </FilterItem>}
            </div>
        </div>
    );
}