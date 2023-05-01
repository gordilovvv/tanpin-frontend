import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useUserStore } from '@/states/user/store';

export function useAccountEventListener() {
    const { address, connector } = useAccount();
    const resetUser = useUserStore(state => state.resetUser);

    useEffect(() => {
        if (address && connector) {
            connector.addListener('disconnect', resetUser);
            connector.addListener('change', resetUser);

            return () => {
                connector.removeListener('disconnect', resetUser);
                connector.removeListener('change', resetUser);
            };
        }
        return undefined;
    }, [address, connector]);
}