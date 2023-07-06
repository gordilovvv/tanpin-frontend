import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, Variants, domMax, motion } from 'framer-motion';
import { ComboboxPopover, useComboboxStore as useComboboxState } from '@ariakit/react';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchInput } from '../../Search/Input/SearchInput';
import { SearchResults } from '../../Search/Results/SearchResults';
import { SEARCH_DEBOUNCE_TIMEOUT } from '@/config/constants';
import styles from './HeaderSearch.module.scss';

const animationMap = {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
};

const animationVariants = {
    initial: { translateY: 32, opacity: 0 },
    animate: { translateY: 0, opacity: 1 },
    exit: { translateY: 32, opacity: 0 },
} as Variants;

// TODO: ПОФИКСИТЬ ЕСЛИ ОТКРЫТЬ ПОИСК И ВКЛЮЧИТЬ АДАПТИВ - ПОПОВЕР ДОЛЖЕН ЗАКРЫТЬСЯ
export function HeaderSearch() {
    const inputRef = useRef<HTMLInputElement>(null);
    const animationRef = useRef<HTMLDivElement>(null);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_TIMEOUT);

    const comboboxState = useComboboxState({
        value: searchQuery,
        setValue: setSearchQuery
    });

    const isComboboxOpened = comboboxState.useState('open');
    const isComboboxMounted = comboboxState.useState('mounted');

    // Blur input and reset searchQuery on ESC
    useEffect(() => {
        if (isComboboxOpened) {
            const handleKeydown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    inputRef.current?.blur();
                    setSearchQuery('');
                }
            };

            document.addEventListener('keydown', handleKeydown);

            return () => document.removeEventListener('keydown', handleKeydown);
        }
    }, [inputRef, isComboboxOpened]);

    return (
        <div className={styles.wrap}>
            <SearchInput
                ref={inputRef}
                state={comboboxState}
                className={styles.search}
            />

            <LazyMotion features={domMax}>
                <AnimatePresence>
                    {isComboboxMounted && <ComboboxPopover
                        as={motion.div}
                        gutter={8}
                        sameWidth
                        ref={animationRef}
                        hidden={false}
                        store={comboboxState}
                        className={styles.popover}
                        {...animationMap}
                        variants={animationVariants}
                        transition={{ duration: 0.25, ease: [0.38, 0, 0.22, 1] }}
                    >
                        <SearchResults searchQuery={debouncedSearchQuery} />
                    </ComboboxPopover>}
                </AnimatePresence>
            </LazyMotion>
        </div>
    );
}