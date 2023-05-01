import { HTMLAttributes, PropsWithChildren, forwardRef } from 'react';
import { MenuButton, MenuStore } from '@ariakit/react';
import { UnstyleButton } from '@/uikit';

type PopoverButtonProps = {
    state: MenuStore
}

export const PopoverButton = forwardRef<HTMLButtonElement, PropsWithChildren<PopoverButtonProps> & HTMLAttributes<HTMLButtonElement>>(
    ({ state, children, ...props }, ref) => {
        return (
            <MenuButton
                as={UnstyleButton}
                ref={ref}
                store={state}
                {...props}
            >
                {children}
            </MenuButton>
        );
    }
);

PopoverButton.displayName = 'PopoverButton';