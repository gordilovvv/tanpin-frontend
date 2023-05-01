import { MenuStoreProps, useMenuStore } from '@ariakit/react';

export function usePopoverState(props?: MenuStoreProps) {
    return useMenuStore(props);
}