import { forwardRef } from 'react';
import { MenuItem, MenuItemProps } from '@ariakit/react';
import { UnstyleButton } from '@/uikit';

export const PopoverItem = forwardRef<HTMLButtonElement, MenuItemProps>(
    ({ children, ...props }, ref) => {
        return (
            <MenuItem
                as={UnstyleButton}
                ref={ref}
                {...props}
            >
                {children}
            </MenuItem>
        );
    }
);

PopoverItem.displayName = 'PopoverItem';