import { PropsWithChildren, forwardRef } from 'react';
import { DisclosureContent as AriaKitDisclosureContent, DisclosureStore } from '@ariakit/react';

type DisclosureContentProps = {
    state: DisclosureStore
    className?: string
};

export const DisclosureContent = forwardRef<HTMLDivElement, PropsWithChildren<DisclosureContentProps>>(
    ({ state, children, className }, ref) => {
        return (
            <AriaKitDisclosureContent
                ref={ref}
                store={state}
                className={className}
            >
                {children}
            </AriaKitDisclosureContent>
        );
    }
);

DisclosureContent.displayName = 'DisclosureContent';