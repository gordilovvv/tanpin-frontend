import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useUserStore } from '@/states/user/store';

export function useAccountEventListener() {
    const { address, connector } = useAccount();
    const resetUser = useUserStore(state => state.resetUser);

    useEffect(() => {
        if (address && connector) {
            const handleDisconnect = () => {
                resetUser();
            };

            connector.addListener('disconnect', handleDisconnect);

            return () => {
                connector.removeListener('disconnect', handleDisconnect);
            };
        }
        return undefined;
    }, [address, connector]);
}