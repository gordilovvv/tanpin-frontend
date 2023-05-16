import { useState, useEffect } from 'react';
import styles from './AttributesFilter.module.scss';

import { AttributesFilterItem } from './AttributesFilterItem/AttributesFilterItem';

export type Option = {
    label: string;
    value: string;
    count?: number;
}

type AttributesFilterProps = {
    options: Option[];
    onChange: (value: Option['value'][]) => void
}

export function AttributesFilter({ options = [], onChange }: AttributesFilterProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    // const handleCheckboxChange = (value: string) => {
    //     setSelectedValues((prevSelectedValues) => {
    //         if (prevSelectedValues.includes(value)) {
    //             return prevSelectedValues.filter((v) => v !== value);
    //         } else {
    //             return [...prevSelectedValues, value];
    //         }
    //     });
    // };

    useEffect(() => {
        onChange(selectedValues);
    }, [selectedValues]);

    return (
        <div className={styles.wrapper}>
            {
                options.map((info) => {
                    return (
                        <AttributesFilterItem
                            key={info.label}
                            info={info}
                        />
                    );
                })
            }
        </div>
    );
}

