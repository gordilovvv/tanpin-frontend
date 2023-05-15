import { HTMLAttributes, forwardRef, useState } from 'react';
import { Input, Search } from '@/uikit';
import { Combobox, ComboboxStore as ComboboxState } from '@ariakit/react';
import styles from './SearchInput.module.scss';
import classNames from 'classnames';

type SearchInputProps = {
    state: ComboboxState
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps & HTMLAttributes<HTMLInputElement>>(
    ({ state, className, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);

        return (
            <div
                className={classNames(styles.search, {
                    [styles.focused]: isFocused
                }, className)}
                {...props}
            >
                <Combobox
                    ref={ref}
                    as={Input}
                    store={state}
                    placeholder='Search'
                    className={styles.input}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                />

                <div className={styles.icon}>
                    <Search />
                </div>
            </div>
        );
    }
);

SearchInput.displayName = 'SearchInput';