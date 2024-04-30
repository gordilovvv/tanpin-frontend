import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, Variants, domMax, motion } from 'framer-motion';
import { ComboboxPopover, useComboboxStore as useComboboxState } from '@ariakit/react';
import { SearchInput } from '../../Search/Input/SearchInput';
import { SearchResults } from '../../Search/Results/SearchResults';
import { SearchCategory } from '@/states/search/fetch/fetchSearchResults';
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

export function HeaderSearch() {
    const inputRef = useRef<HTMLInputElement>(null);
    const animationRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchCategory, setSearchCategory] = useState<SearchCategory>(SearchCategory.NFTS);

    const resetSearch = useCallback(() => {
        setSearchQuery('');
        setSearchCategory(SearchCategory.NFTS);
    }, [setSearchQuery, setSearchCategory]);

    const comboboxState = useComboboxState({
        open: isOpen,
        value: searchQuery,
        setValue: setSearchQuery,
        setOpen: (opened) => {
            if (opened && !searchQuery.length) {
                return;
            }

            return setIsOpen(opened);
        }
    });

    const isComboboxOpened = comboboxState.useState('open');
    const isComboboxMounted = comboboxState.useState('mounted');

    useEffect(() => {
        if (searchQuery.length) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!isOpen) {
            inputRef.current?.blur();
        }
    }, [isOpen]);

    // Blur input and reset searchQuery on ESC
    useEffect(() => {
        if (isComboboxOpened) {
            const handleKeydown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    resetSearch();
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
                        ref={animationRef}
                        hidden={false}
                        store={comboboxState}
                        style={{ width: '360px' }}
                        className={styles.popover}
                        {...animationMap}
                        variants={animationVariants}
                        transition={{ duration: 0.25, ease: [0.38, 0, 0.22, 1] }}
                    >
                        <SearchResults
                            searchQuery={searchQuery}
                            searchCategory={searchCategory}
                            onSearchCategory={setSearchCategory}
                            onSearchReset={resetSearch}
                        />
                    </ComboboxPopover>}
                </AnimatePresence>
            </LazyMotion>
        </div>
    );
}