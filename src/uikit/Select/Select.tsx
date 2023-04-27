import { useState, useRef } from 'react';
import { ArrowSmall, Mark } from '@/uikit';
import styles from './Select.module.scss';
import classNames from 'classnames';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

type SelectOption = {
    value: string;
    label: string;
}

type SelectProps = {
    SelectOption: SelectOption[];
    value: string;
    placeHolderText?: string;
    onOptionChange: (value: string) => void;
}

export function Select({ SelectOption, value, onOptionChange, placeHolderText = '' }: SelectProps) {
    const select = useRef(null);

    useOnClickOutside(select, () => {
        if (isOpen) {
            setIsOpen(false);
            onOptionChange(value);
        }
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionValue: string) => {
        setIsOpen(false);
        onOptionChange(optionValue);
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
                <div className="selected-value">{SelectOption.find(el => el.value === value)?.label || <span className={styles.selectPlaceholder}>{placeHolderText}</span>}</div>
                <ArrowSmall className={styles.selectArrow} />

            </div>

            {(
                <div className={classNames(styles.selectOptions,)}>
                    {SelectOption.map((option) => (
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