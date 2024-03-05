import { useRef } from 'react';
import { ArrowDropdown, PopoverButton, PopoverMenu, Skeleton, usePopoverState } from '@/uikit';
import { CurrencyIcon } from './CurrencyIcon';
import { CurrencyName } from './CurrencyName';
import { CurrencySelectItem } from './CurrencySelectItem';
import { InputCurrency, OutputCurrency } from '@/states/deposit/types';
import { Variants } from 'framer-motion';
import classNames from 'classnames';
import styles from './CurrencySelect.module.scss';

const animationHandler = (element: HTMLElement | null) => {
    if (!element) {
        return;
    }

    if (element.classList.contains('appear')) {
        element.classList.remove('appear');
        element.classList.add('disappear');
    } else {
        element.classList.remove('disappear');
        element.classList.add('appear');
    }
};

const animationMap = {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
};

const animationVariants = {
    initial: { transform: 'scale(0.62)' },
    animate: { transform: 'scale(1)' },
    exit: { transform: 'scale(0.62)' },
} as Variants;

type CurrencySelectProps = {
    selectedCurrency: InputCurrency | OutputCurrency,
    allCurrencies: (InputCurrency | OutputCurrency)[],
    onSelect: (currencyId: string) => void
}

export function CurrencySelect({ selectedCurrency, allCurrencies, onSelect }: CurrencySelectProps) {
    const animationRef = useRef<HTMLDivElement>(null);
    const popoverState = usePopoverState({
        placement: 'bottom-end'
    });
    const isPopoverOpened = popoverState.useState('open');

    const handleCurrencySelect = (currencyId: string) => {
        onSelect(currencyId);
        popoverState.hide();
    };

    if (allCurrencies.length === 1) {
        return (
            <div
                className={classNames(styles.select, {
                    [styles.opened]: isPopoverOpened
                })}
            >
                <CurrencyIcon currencyId={selectedCurrency.id} />
                <CurrencyName currency={selectedCurrency} />
            </div>
        );
    }

    return (
        <>
            <PopoverButton
                state={popoverState}
                className={classNames(styles.select, {
                    [styles.opened]: isPopoverOpened
                })}
            >
                <CurrencyIcon currencyId={selectedCurrency.id} />

                <CurrencyName currency={selectedCurrency} />

                <div className={styles.arrow}>
                    <ArrowDropdown />
                </div>
            </PopoverButton>

            <PopoverMenu
                ref={animationRef}
                state={popoverState}
                width={240}
                gutter={4}
                overflow='hidden'
                className={styles.popover}
                {...animationMap}
                variants={animationVariants}
                transition={{ duration: 0.12, ease: [0.35, 0.05, 0.26, 1] }}
                onAnimationStart={() => animationHandler(animationRef.current)}
            >
                <div className={styles.list}>
                    {allCurrencies.map(currency => <CurrencySelectItem
                        key={currency.id}
                        currency={currency}
                        active={currency.id === selectedCurrency.id}
                        onClick={() => handleCurrencySelect(currency.id)}
                    />)}
                </div>
            </PopoverMenu>
        </>
    );
}

export function CurrencySelectSkeleton() {
    return <Skeleton className={styles.selectSkeleton} />;
}