import { useState, useEffect } from 'react';
import styles from './AttributesFilter.module.scss';
import { Mark } from '@/uikit';
import classNames from 'classnames';

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

    const handleCheckboxChange = (value: string) => {
        setSelectedValues((prevSelectedValues) => {
            if (prevSelectedValues.includes(value)) {
                return prevSelectedValues.filter((v) => v !== value);
            } else {
                return [...prevSelectedValues, value];
            }
        });
    };

    useEffect(() => {
        onChange(selectedValues);
    }, [selectedValues]);

    return (
        <div className={styles.wrapper}>
            {
                options.map(({ value, label, count }) => {
                    return (<div key={value}>
                        <input
                            type="checkbox"
                            name="a"
                            value={value}
                            id={value}
                            onChange={() => handleCheckboxChange(value)}
                        />

                        <label
                            htmlFor={value}

                            className={classNames(styles.label, {
                                [styles.active]: selectedValues.includes(value)
                            })}
                        >
                            <div className={styles.box}>
                                <Mark className={styles.mark} />
                            </div>

                            <div className={styles.title}>
                                {label}
                            </div>

                            {count && <div className={styles.count}>{count} {+count === 1 ? 'item' : 'items'}</div>}
                        </label>
                    </div>);
                })
            }
        </div>
    );
}

