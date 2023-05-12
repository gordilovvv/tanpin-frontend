import { DisclosureStoreProps, useDisclosureStore } from '@ariakit/react';

export function useDisclosureState(props?: DisclosureStoreProps) {
    return useDisclosureStore(props);
}