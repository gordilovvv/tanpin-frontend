import { PropsWithChildren, forwardRef } from 'react';
import { Disclosure as AriaKitDisclosure, DisclosureStore } from '@ariakit/react';
import { UnstyleButton } from '..';

type DisclosureProps = {
    state: DisclosureStore
    className?: string
}

export const Disclosure = forwardRef<HTMLButtonElement, PropsWithChildren<DisclosureProps>>(
    ({ state, className, children }, ref) => {
        return (
            <AriaKitDisclosure
                as={UnstyleButton}
                ref={ref}
                store={state}
                className={className}
            >
                {children}
            </AriaKitDisclosure>
        );
    }
);

Disclosure.displayName = 'Disclosure';