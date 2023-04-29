import { useState, useMemo, MouseEvent, useEffect } from 'react';
import { Mark, SvgProps, UnstyleButton } from '@/uikit';
import classNames from 'classnames';
import styles from './Select.module.scss';

const Arrow = (props: SvgProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L12 13.5858L16.2929 9.29289C16.6834 8.90237 17.3166 8.90237 17.7071 9.29289Z"
                fill="white"
            />
        </svg>
    );
};

type SelectOption = {
    value: string
    label: string
}

type SelectProps = {
    options: SelectOption[]
    selectedValue?: string
    placeholderText?: string
    onChange: (value: string) => void
}

// TODO:
// 1. Refactor
// 2. Add Popover to dropdown
export function Select({ options, selectedValue, placeholderText = '', onChange }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = useMemo(() => {
        if (!selectedValue) {
            return undefined;
        }

        return options.find(option => option.value === selectedValue);
    }, [options, selectedValue]);

    useEffect(() => {
        if (isOpen) {
            const handleClickOutside = () => {
                setIsOpen(false);
            };

            document.addEventListener('click', handleClickOutside);

            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [isOpen]);

    const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
        setIsOpen(!isOpen);
        event.stopPropagation();
    };

    const handleOptionClick = (value: string) => {
        setIsOpen(false);
        onChange(value);
    };

    return (
        <div className={styles.select}>
            <UnstyleButton
                className={classNames(styles.button, {
                    [styles.opened]: isOpen
                })}
                onClick={handleToggle}
            >
                <span className={styles.buttonText}>
                    {selectedOption?.label || <span className={styles.placeholder}>{placeholderText}</span>}
                </span>

                <Arrow />
            </UnstyleButton>

            <div
                className={styles.dropdown}
                style={{ display: isOpen ? undefined : 'none' }}
            >
                {options.map((option) => {
                    const isActive = option.value === selectedOption?.value;

                    return <div
                        key={option.value}
                        className={classNames(styles.option, {
                            [styles.selected]: isActive
                        })}
                        onClick={() => handleOptionClick(option.value)}
                    >
                        {isActive && <div className={styles.optionIcon}>
                            <Mark />
                        </div>}

                        <div className={styles.optionText}>
                            {option.label}
                        </div>
                    </div>;
                })}
            </div>
        </div>
    );

}