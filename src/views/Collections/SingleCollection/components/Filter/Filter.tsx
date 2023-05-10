import { ReactNode, useState } from 'react';
import styles from './Filter.module.scss';
import { InputPrice, InputSearch, Select, Button } from '@/uikit';
import { Filter as FilterIcon } from '@/uikit';
import classNames from 'classnames';
type FilterProps = {
    tableSlot: ReactNode
}

export function Filter({ tableSlot }: FilterProps) {
    const [val, setVal] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const options = [{
        value: 'string',
        label: 'string',
    }];
    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <Button
                    iconSlot={<FilterIcon />}
                    view="secondary"
                    onClick={() => setIsFilterOpen(prev => !prev)}
                >Filters</Button>

                <InputSearch
                    value={val}
                    placeholder="Search"
                    onChange={(val) => setVal(val)}
                />

                <Select
                    placeholderText="Status"
                    onChange={() => null}
                    options={options}
                />
            </div>

            <div className={styles.table}>{tableSlot}</div>

            <div className={classNames(styles.filter, { [styles.hidden]: isFilterOpen })} >

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

                    <InputPrice
                        onMinPriceChange={(val) => console.log(val)}
                        onMaxPriceChange={(val) => console.log(val)}
                    />

                </div>

                <div className={styles.item}>
                    <div className={styles.header}>
                        <div className={styles.title}>Properties</div>
                    </div>

                    <div className={styles.inner}>

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
        </div>
    );
}