import { useState } from 'react';
import { ArrowSmall } from '@/uikit';
import styles from './Select.module.scss';

type Option = {
    value: string;
    label: string;
}

type SelectProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

export function Select({ options, value, onChange }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionValue: string) => {
        setIsOpen(false);
        onChange(optionValue);
    };

    return (
        <div className={styles.select}>
            <div
                className={styles.selectHeader}
                onClick={handleToggle}
            >
                <div className="selected-value">{value}</div>
                <ArrowSmall className={`arrow ${isOpen ? 'up' : 'down'}`} />

            </div>

            {isOpen && (
                <div className="options">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`option ${option.value === value ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}