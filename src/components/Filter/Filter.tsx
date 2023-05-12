import { useState } from 'react';
import styles from './Filter.module.scss';
import { InputSearch, Select } from '@/uikit';
import classNames from 'classnames';
import { PriceFilter } from './components/PriceFilter/PriceFilter';
import { AttributesDisclosure } from './AttributesDisclosure/AttributesDisclosure';


export function Filter() {
    const [val, setVal] = useState('');

    const options = [{
        value: 'string',
        label: 'string',
    }];

    return (
        <div className={classNames(styles.filter, { [styles.hidden]: false })} >

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
                    <AttributesDisclosure
                        title='Condition'
                        attributesCount='10'
                        selectedCount={10}
                    >
                        options
                    </AttributesDisclosure>

                    <InputSearch
                        value={val}
                        onChange={(val) => setVal(val)}
                        placeholder="Search"
                    />

                    <div className={styles.group}>
                        <Select
                            placeholderText="Status"
                            onChange={() => null}
                            options={options}
                        />

                        <Select
                            placeholderText="Status"
                            onChange={() => null}
                            options={options}
                        />

                        <Select
                            placeholderText="Status"
                            onChange={() => null}
                            options={options}
                        />

                        <Select
                            placeholderText="Status"
                            onChange={() => null}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}