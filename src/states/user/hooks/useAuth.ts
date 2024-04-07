import { useCallback } from 'react';
import { ConnectorNotFoundError, useAccount, useConnect, useDisconnect } from 'wagmi';
import { SwitchChainError } from 'viem';
import { useUserStore } from '../store';
import { useTranslation } from '@/localization';
import { useWalletSignature } from './useWalletSignature';
import { POLICY_URL, TERMS_URL } from '@/config';
import { ConnectorNames } from '@/config/wallet';
import { activeChainId } from '@/config/chain';

export function useAuth() {
    const resetUser = useUserStore(state => state.resetUser);
    const { connectAsync, connectors } = useConnect();
    const { disconnectAsync } = useDisconnect();

    const login = useCallback(
        async (connectorID: ConnectorNames) => {
            const findConnector = connectors.find((c) => c.id === connectorID);

            try {
                const connected = await connectAsync({
                    connector: findConnector,
                    chainId: activeChainId
                });

                return connected;
            } catch (error) {
                if (error instanceof ConnectorNotFoundError) {
                    throw new Error('Connector not found.');
                }

                if (error instanceof SwitchChainError) {
                    throw new Error('Unable to switch network. Please try it on your wallet');
                }
            }

            return undefined;
        },
        [connectors, connectAsync]
    );

    const logout = useCallback(async () => {
        try {
            await disconnectAsync();
        } catch (error) {
            console.error(error);
        } finally {
            resetUser();
        }
    }, [disconnectAsync]);

    return { login, logout };
}

export function useWalletAuthenticator() {
    const { t } = useTranslation();
    const { signMessage, reset, loading, error, status } = useWalletSignature();

    const setUser = useUserStore(state => state.setUser);
    const authenticateWallet = async () => {
        await signMessage({
            text: t('I accept the Tanpin Terms of Service %termsUrl% and Privacy Policy %policyUrl%.', {
                termsUrl: TERMS_URL,
                policyUrl: POLICY_URL
            }),
            onSignature: async () => {
                setUser({ loginSigned: true });
            }
        });
    };

    const authenticateTelegramWallet = async () => {
        await authenticateWallet();
    };

    return {
        loading,
        error,
        status,
        authenticateWallet,
        authenticateTelegramWallet,
        reset
    };
}

export enum AuthModal {
    SIGN = 'sign'
}

/**
 * Hook checks User Store and gives current opened auth modal (if App need)
 * 
 * @example wallet is connected, but we haven't got AccessToken. We should open SignModal
 * @example wallet isn't connected. We do nothing
 */
export function useAuthOpenedModal() {
    const { isConnected } = useAccount();
    const loginSigned = useUserStore(state => state.loginSigned);

    if (!isConnected) {
        return undefined;
    }

    if (!loginSigned) {
        return AuthModal.SIGN;
    }

    return undefined;
}