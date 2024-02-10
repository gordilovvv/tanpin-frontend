import { HTMLAttributes, useCallback, useRef } from 'react';
import { PopoverButton, PopoverMenu, usePopoverState, World } from '@/uikit';
import { LanguagesList } from './List/LanguagesList';
import { savePreferredLanguage } from '@/localization';
import { Variants } from 'framer-motion';
import classNames from 'classnames';
import styles from './LanguageButton.module.scss';

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

export function LanguageButton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    const animationRef = useRef<HTMLDivElement>(null);
    const popoverState = usePopoverState({
        placement: 'bottom-end'
    });

    const changeLanguage = useCallback((locale: string) => {
        savePreferredLanguage(locale);
        popoverState.hide();
        window.location.reload();
    }, [popoverState.hide]);

    return (<div
        className={classNames(styles.wrapper, className)}
        {...props}
    >
        <PopoverButton
            state={popoverState}
            className={classNames(styles.button, {
                [styles.active]: popoverState.useState('open')
            })}
        >
            <World className={styles.icon} />
        </PopoverButton>

        <PopoverMenu
            ref={animationRef}
            state={popoverState}
            width={178}
            gutter={20}
            overflow='hidden'
            className={styles.popover}
            {...animationMap}
            variants={animationVariants}
            transition={{ duration: 0.12, ease: [0.35, 0.05, 0.26, 1] }}
            onAnimationStart={() => animationHandler(animationRef.current)}
        >
            <LanguagesList onChange={changeLanguage} />
        </PopoverMenu>
    </div>);
}