import { useState, useRef } from 'react';
import { ArrowSmall, Mark } from '@/uikit';
import styles from './Select.module.scss';
import classNames from 'classnames';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

type Option = {
    value: string;
    label: string;
}

type SelectProps = {
    options: Option[];
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export function Select({ options, value, onChange, placeholder = '' }: SelectProps) {
    const select = useRef(null);

    useOnClickOutside(select, () => {
        if (isOpen) {
            setIsOpen(false);
            onChange(value);
        }
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionValue: string) => {
        setIsOpen(false);
        onChange(optionValue);
    };

    return (
        <div
            className={classNames(styles.select, {
                [styles.isOpen]: isOpen
            })}
            ref={select}
            onClick={handleToggle}
        >
            <div
                className={styles.selectHeader}

            >
                <div className="selected-value">{options.find(el => el.value === value)?.label || <span className={styles.selectPlaceholder}>{placeholder}</span>}</div>
                <ArrowSmall className={styles.selectArrow} />

            </div>

            {(
                <div className={classNames(styles.selectOptions,)}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={classNames(styles.selectOption, {
                                [styles.selected]: option.value === value
                            })}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            <Mark className={styles.selectOptionMark} />
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}