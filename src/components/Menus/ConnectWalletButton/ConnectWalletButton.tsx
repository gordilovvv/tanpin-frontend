import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/uikit';
import { ErrorMessageModal } from '@/components/Modals';
import { ConnectWalletModal } from '../ConnectWalletModal/ConnectWalletModal';
import { ConnectorNames, createWallets } from '@/config/wallet';
import { useAccount } from 'wagmi';
import { useUserStore } from '@/states/user/store';
import { useAuth } from '@/states/user/hooks/useAuth';
import { useOpenedState } from '@/hooks/useOpenedState';

export function ConnectWalletButton() {
    const { login } = useAuth();
    const { isConnected } = useAccount();
    const [connectError, setConnectError] = useState<string | undefined>();

    const wallets = useMemo(() => createWallets(), []);
    const logged = useUserStore(state => !!state.accessToken);
    const connectPopupState = useOpenedState();

    if (connectPopupState.isOpen && logged && isConnected) {
        connectPopupState.close();
    }

    const handleLogin = useCallback(async (id: ConnectorNames) => {
        try {
            await login(id);
        } catch (error) {
            setConnectError((error as Error).message as string);
        }
    }, [wallets, setConnectError]);

    return (
        <>
            <Button onClick={connectPopupState.open}>
                Connect wallet
            </Button>

            <ConnectWalletModal
                wallets={wallets}
                login={handleLogin}
                isOpen={connectPopupState.isOpen}
                onClose={connectPopupState.close}
            />

            <ErrorMessageModal
                isOpen={!!connectError}
                error={connectError}
                onClose={() => setConnectError(undefined)}
            />
        </>
    );
}