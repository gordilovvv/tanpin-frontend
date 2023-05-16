import styles from './Filter.module.scss';
import { Select } from '@/uikit';
import { PriceFilter } from './components/PriceFilter/PriceFilter';
import { AttributesDisclosure } from './AttributesDisclosure/AttributesDisclosure';
import { AttributesFilter } from './AttributesFilter/AttributesFilter';

import { useFilterStore } from '@/states/collection/filterStore';

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

type Hashmap = {
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
export function Filter() {
    const activeAttributes: Hashmap = convertToHashmap(useFilterStore((state) => state.attributes));

    const options = [{
        value: 'string',
        label: 'string',
    }];

    return (
        <div className={styles.filter} >
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
                    onMinPriceChange={(val) => console.log(val)}
                    onMaxPriceChange={(val) => console.log(val)}
                />
            </div>

            <div className={styles.item}>
                <div className={styles.header}>
                    <div className={styles.title}>Properties</div>
                </div>

                <div className={styles.inner}>
                    <div className={styles.group}>
                        {/* <AttributesDisclosure
                            // title='Condition'
                            title={JSON.stringify(atr)}
                            attributesCount='10'
                            selectedCount={atr?.length}
                        >
                            <AttributesFilter
                                onChange={setAtr}
                                options={optionsAtr}
                            />
                        </AttributesDisclosure>

                        <AttributesDisclosure
                            // title='Condition'
                            title={JSON.stringify(atr)}
                            attributesCount='10'
                            selectedCount={atr?.length}
                        >
                            <AttributesFilter
                                onChange={setAtr}
                                options={optionsAtr}
                            />
                        </AttributesDisclosure> */}


                        {
                            attributes.map(({ traitType, values }) => {

                                return (

                                    < AttributesDisclosure
                                        key={traitType}
                                        // title='Condition'
                                        title={traitType}
                                        attributesCount='10'
                                    // selectedCount={atr?.length
                                    // }
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