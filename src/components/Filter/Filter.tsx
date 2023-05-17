import styles from './Filter.module.scss';
import { Select } from '@/uikit';
import { PriceFilter } from './PriceFilter/PriceFilter';
import { FilterItem } from './FilterItem/FilterItem';
import { AttributesFilter } from './AttributesFilter/AttributesFilter';
import { convertToHashmap } from '@/utils/convertToHashmap';
import { NFTSaleStatus } from '@/states/types';
import { useFilterStoreActons } from '@/states/collection/hooks/useFilterStoreActions';
import { useFilterStore } from '@/states/collection/filterStore';
import { HTMLAttributes, useMemo } from 'react';
import classNames from 'classnames';

const attributes = [
    {
        traitType: 'Brand',
        values: ['gucci', 'nike', 'adidas'],
    },
    {
        traitType: 'cars',
        values: ['audi', 'bmw', 'nissan'],
    },
];

type AttributesHashMap = {
    [key: string]: { [key: string]: boolean };
}

type FilterProps = HTMLAttributes<HTMLDivElement>;


const saleStatusesOptions: { value: NFTSaleStatus, label: string }[] = [
    {
        value: NFTSaleStatus.FIXED_PRICE,
        label: 'Fixed price'
    },
    {
        value: NFTSaleStatus.AUCTION,
        label: 'Auction'
    },
    {
        value: NFTSaleStatus.NOT_FOR_SALE,
        label: 'Not for sale'
    },
];

export function Filter({ className, ...props }: FilterProps) {
    const { setStatus, setMaxPrice, setMinPrice } = useFilterStoreActons();
    const status = useFilterStore((state) => state.status);

    const allAttributes = useFilterStore((state) => state.attributes);

    const activeAttributes = useMemo(() => {
        return convertToHashmap(allAttributes) as AttributesHashMap;
    }, [allAttributes]);

    return (
        <div
            className={classNames(styles.filter, className)}
            {...props}
        >
            <FilterItem title="Status" >
                <Select
                    placeholderText="Status"
                    onChange={setStatus}
                    selectedValue={status}
                    options={saleStatusesOptions}
                />
            </FilterItem>

            <FilterItem
                title="Price"
                currency="USDT"
            >
                <PriceFilter
                    onMinPriceChange={setMinPrice}
                    onMaxPriceChange={setMaxPrice}
                />
            </FilterItem>

            <FilterItem title="Properties">
                <div className={styles.inner}>
                    <div className={styles.group}>
                        {
                            attributes.map(({ traitType, values }) => {
                                return (
                                    <AttributesFilter
                                        key={traitType}
                                        traitType={traitType}
                                        values={values}
                                        activeAttributes={activeAttributes}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </FilterItem>
        </div >
    );
}