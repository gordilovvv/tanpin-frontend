import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, ButtonProps } from '@/uikit';
import { ConnectWalletModal, ErrorMessageModal } from '@/components/Modals';
import { ConnectorNames, createWallets } from '@/config/wallet';
import { useAccount } from 'wagmi';
import { useAuth } from '@/states/user/hooks/useAuth';
import { useTranslation } from '@/localization';
import { useOpenedState } from '@/hooks/useOpenedState';

type ConnectWalletButtonProps = Omit<ButtonProps<'button'>, 'onClick'> & {
    text?: string
};

export function ConnectWalletButton({ text, ...props }: ConnectWalletButtonProps) {
    const { t } = useTranslation();
    const { login } = useAuth();
    const { isConnected } = useAccount();
    const [connectError, setConnectError] = useState<string | undefined>();

    const wallets = useMemo(() => createWallets(), []);
    const connectPopupState = useOpenedState();

    useEffect(() => {
        if (connectPopupState.isOpen && isConnected) {
            connectPopupState.close();
        }
    }, [connectPopupState.isOpen, connectPopupState.close, isConnected]);

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
                {text ?? t('Connect wallet')}
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