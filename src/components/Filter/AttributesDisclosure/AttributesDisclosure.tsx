import { PropsWithChildren } from 'react';
import { ArrowDropdown, Disclosure, DisclosureContent, useDisclosureState } from '@/uikit';
import { Counter } from './Counter/Counter';
import classNames from 'classnames';
import styles from './AttributesDisclosure.module.scss';

type AttributesDisclosureProps = {
    title: string
    attributesCount?: string | number
    selectedCount?: string | number
    defaultOpen?: boolean
}

export function AttributesDisclosure({ title, attributesCount, selectedCount, defaultOpen, children }: PropsWithChildren<AttributesDisclosureProps>) {
    const state = useDisclosureState({ defaultOpen });
    const isOpen = state.useState('open');

    return (
        <div
            className={classNames(styles.wrap, {
                [styles.opened]: isOpen
            })}
        >
            <Disclosure
                state={state}
                className={styles.head}
            >
                <div className={styles.left}>
                    <div className={styles.title}>
                        {title}
                    </div>

                    <Counter
                        attributesCount={attributesCount}
                        selectedCount={selectedCount}
                    />
                </div>

                <div className={styles.arrow}>
                    <ArrowDropdown />
                </div>
            </Disclosure>

            <DisclosureContent
                state={state}
                className={styles.body}
            >
                <div className={styles.bodyWrap}>
                    {children}
                </div>
            </DisclosureContent>
        </div>
    );
}