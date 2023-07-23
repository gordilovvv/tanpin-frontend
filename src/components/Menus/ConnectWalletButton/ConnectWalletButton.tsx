import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, ButtonProps } from '@/uikit';
import { ErrorMessageModal } from '@/components/Modals';
import { ConnectWalletModal } from '../ConnectWalletModal/ConnectWalletModal';
import { ConnectorNames, createWallets } from '@/config/wallet';
import { useAccount } from 'wagmi';
import { useUserStore } from '@/states/user/store';
import { useAuth } from '@/states/user/hooks/useAuth';
import { useOpenedState } from '@/hooks/useOpenedState';

type ConnectWalletButtonProps = Omit<ButtonProps<'button'>, 'onClick'>;

export function ConnectWalletButton(props: ConnectWalletButtonProps) {
    const { login } = useAuth();
    const { isConnected } = useAccount();
    const [connectError, setConnectError] = useState<string | undefined>();

    const wallets = useMemo(() => createWallets(), []);
    const logged = useUserStore(state => !!state.accessToken);
    const connectPopupState = useOpenedState();

    useEffect(() => {
        if (connectPopupState.isOpen && logged && isConnected) {
            connectPopupState.close();
        }
    }, [connectPopupState.isOpen, connectPopupState.close, logged, isConnected]);

    const handleLogin = useCallback(async (id: ConnectorNames) => {
        try {
            await login(id);
        } catch (error) {
            setConnectError((error as Error).message as string);
        }
    }, [login, setConnectError]);

    return (
        <>
            <Button
                {...props}
                onClick={connectPopupState.open}
            >
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