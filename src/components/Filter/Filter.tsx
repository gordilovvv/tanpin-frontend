import styles from './Filter.module.scss';
import { Select } from '@/uikit';
import { PriceFilter } from './components/PriceFilter/PriceFilter';
import { AttributesDisclosure } from './AttributesDisclosure/AttributesDisclosure';
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

// TODO:
// 1. Поправить порядок аттрибутов. Тут должен быть компонент ОДИН AttributesFilter
// 2. AttributesFilterItem переименовать в AttributeFilterOption
// 3. Сделать компонент под item (FilerItem)
// 4. Убрать components папку у PriceFilter
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
            <div className={styles.item}>
                <div className={styles.header}>
                    <div className={styles.title}>Status</div>
                </div>

                <Select
                    placeholderText="Status"
                    onChange={() => null}
                    options={options}
                />
            </div>

            <div className={styles.item}>
                <div className={styles.header}>
                    <div className={styles.title}>Price</div>
                    <div className={styles.currency}>USDT</div>
                </div>

                <PriceFilter
                    onMinPriceChange={handlePriceChange}
                    onMaxPriceChange={handlePriceChange}
                />
            </div>

            <div className={styles.item}>
                <div className={styles.header}>
                    <div className={styles.title}>Properties</div>
                </div>

                <div className={styles.inner}>
                    <div className={styles.group}>
                        {
                            attributes.map(({ traitType, values }) => {
                                return (
                                    <AttributesDisclosure
                                        key={traitType}
                                        title={traitType}
                                        attributesCount={values.length}
                                    >
                                        <AttributesFilter
                                            traitType={traitType}
                                            values={values}
                                            activeAttributes={activeAttributes}
                                        />
                                    </AttributesDisclosure>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}