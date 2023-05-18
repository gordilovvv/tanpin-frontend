import { HTMLAttributes, useMemo } from 'react';
import { Select } from '@/uikit';
import { FilterItem } from './FilterItem/FilterItem';
import { PriceFilter } from './PriceFilter/PriceFilter';
import { AttributesFilter } from './AttributesFilter/AttributesFilter';
import { useFilterStore } from '@/states/collection/filterStore';
import { useFilterStoreActions } from '@/states/collection/hooks/useFilterStoreActions';
import { convertToHashmap } from '@/utils/convertToHashmap';
import { ActiveAttributesHashMap } from './types';
import { NFTSaleStatus } from '@/states/types';
import { Collection } from '@/states/collection/types';
import classNames from 'classnames';
import styles from './Filter.module.scss';

type FilterProps = {
    collection?: Collection
} & HTMLAttributes<HTMLDivElement>;

export function Filter({ collection, className, ...props }: FilterProps) {
    const {
        setStatus,
        setMaxPrice,
        setMinPrice
    } = useFilterStoreActions();

    const [status, activeAttributes] = useFilterStore((state) => [state.status, state.attributes]);

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
            className={classNames(styles.filter, className)}
            {...props}
        >
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
    );
}