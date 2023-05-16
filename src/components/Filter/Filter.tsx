import { useState } from 'react';
import styles from './Filter.module.scss';
import { Select } from '@/uikit';
import { PriceFilter } from './components/PriceFilter/PriceFilter';
import { AttributesDisclosure } from './AttributesDisclosure/AttributesDisclosure';
import { AttributesFilter } from './AttributesFilter/AttributesFilter';
import type { Option } from './AttributesFilter/AttributesFilter';

export function Filter() {
    const [atr, setAtr] = useState<Option['value'][]>();


    const options = [{
        value: 'string',
        label: 'string',
    }];

    const optionsAtr = [
        { label: 'Option 1', value: 'option1', count: 1 },
        { label: 'Option 2', value: 'option2', count: 25 },
        { label: 'Option 3', value: 'option3', },
    ];



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
                        </AttributesDisclosure><AttributesDisclosure
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
                        </AttributesDisclosure>
                    </div>
                </div>
            </div>
        </div>
    );
}