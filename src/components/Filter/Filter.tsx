import styles from './Filter.module.scss';
import { Select } from '@/uikit';
import { PriceFilter } from './PriceFilter/PriceFilter';
import { FilterItem } from './FilterItem/FilterItem';
import { AttributesFilter } from './AttributesFilter/AttributesFilter';

import { useFilterStore } from '@/states/collection/filterStore';
import { HTMLAttributes, useCallback, useMemo } from 'react';
import classNames from 'classnames';

function convertToHashmap(array: Trait[]) {
    const hashmap = {};

    for (const item of array) {
        const { traitType, values } = item;
        const valuesObject = {};

        for (const value of values) {
            valuesObject[value] = true;
        }

        hashmap[traitType] = valuesObject;
    }

    return hashmap;
}

type Trait = {
    traitType: string;
    values: string[];
}

type AttributesHashMap = {
    [key: string]: { [key: string]: boolean };
}

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

type FilterProps = HTMLAttributes<HTMLDivElement>;

// TODO: - уже сделано
// 1. Поправить порядок аттрибутов. Тут должен быть компонент ОДИН AttributesFilter -done
// 2. AttributesFilterItem переименовать в AttributeFilterOption - done
// 3. Сделать компонент под item (FilerItem) -done
// 4. Убрать components папку у PriceFilter -done
export function Filter({ className, ...props }: FilterProps) {
    const allAttributes = useFilterStore((state) => state.attributes);

    const activeAttributes = useMemo(() => {
        return convertToHashmap(allAttributes) as AttributesHashMap;
    }, [allAttributes]);

    const options = [{
        value: 'string',
        label: 'string',
    }];

    const handlePriceChange = useCallback((val: string) => {
        console.log(val);
    }, []);

    return (
        <div
            className={classNames(styles.filter, className)}
            {...props}
        >
            <FilterItem title="Status" >
                <Select
                    placeholderText="Status"
                    onChange={() => null}
                    options={options}
                />
            </FilterItem>

            <FilterItem
                title="Price"
                currency="USDT"
            >
                <PriceFilter
                    onMinPriceChange={handlePriceChange}
                    onMaxPriceChange={handlePriceChange}
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