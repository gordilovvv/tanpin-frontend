import { ReactNode, useMemo } from 'react';
import { Mark } from '@/uikit';
import { PopoverButton, PopoverItem, PopoverMenu, usePopoverState } from '../Popover';
import { Arrow } from './Arrow';
import { Variants } from 'framer-motion';
import classNames from 'classnames';
import styles from './Select.module.scss';

type SelectProps<T> = {
    options: { value: T, label: string }[]
    selectedValue?: T
    addon?: ReactNode,
    placeholder?: string
    onChange: (value: T) => void
}

const animationMap = {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
};

const animationVariants = {
    initial: { transform: 'translate(0, 20px)', opacity: 0 },
    animate: { transform: 'translate(0, 0)', opacity: 1 },
    exit: { transform: 'translate(0, 20px)', opacity: 0 },
} as Variants;

export function Select<T extends string | number>({ options, selectedValue, addon, placeholder = '', onChange }: SelectProps<T>) {
    const state = usePopoverState({
        placement: 'bottom-start'
    });

    const isOpen = state.useState('open');
    const selectedOption = useMemo(() => {
        if (!selectedValue) {
            return undefined;
        }

        return options.find(option => option.value === selectedValue);
    }, [options, selectedValue]);

    const handleOptionClick = (value: T) => {
        onChange(value);
        state.setOpen(false);
    };

    return (
        <>
            <PopoverButton
                state={state}
                className={classNames(styles.button, {
                    [styles.opened]: isOpen
                })}
            >
                <div className={styles.buttonContent}>
                    {addon && <div className={styles.addon}>
                        {addon}
                    </div>}

                    <div className={styles.text}>
                        {selectedOption?.label || <span className={styles.placeholder}>{placeholder}</span>}
                    </div>
                </div>

                <div className={styles.arrow}>
                    <Arrow />
                </div>
            </PopoverButton>

            <PopoverMenu
                state={state}
                maxHeight={144}
                gutter={8}
                sameWidth
                {...animationMap}
                variants={animationVariants}
                transition={{ duration: 0.15, ease: [0.38, 0, 0.22, 1] }}
            >
                {options.map((option) => {
                    const isActive = option.value === selectedOption?.value;

                    return <PopoverItem
                        store={state}
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
                    </PopoverItem>;
                })}
            </PopoverMenu >
        </>
    );
}