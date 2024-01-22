import { useCallback } from 'react';
import { ConnectorNotFoundError, useAccount, useConnect, useDisconnect } from 'wagmi';
import { SwitchChainError } from 'viem';
import { useUserStore } from '../store';
import { useWalletSignature } from './useWalletSignature';
import { loginWeb3 } from '../fetch/loginWeb3';
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
    const setUser = useUserStore(state => state.setUser);
    const { signMessage, reset, loading, error, status } = useWalletSignature();

    const authenticateWithServer = async () => {
        await signMessage({
            text: `I accept the Tanpin Terms of Service ${TERMS_URL} and Privacy Policy ${POLICY_URL}.`,
            onSignature: async ({ address, message, signature }) => {
                const { accessToken, rulesAccept } = await loginWeb3({
                    address,
                    message,
                    signature
                });

                setUser(accessToken, rulesAccept);
            }
        });
    };

    return {
        authenticateWithServer,
        reset,
        loading,
        error,
        status
    };
}

export enum AuthModal {
    SIGN = 'sign',
    AGREE = 'agree'
}

/**
 * Hook checks User Store and gives current opened auth modal (if App need)
 * 
 * @example wallet is connected, but we haven't got AccessToken. We should open SignModal
 * @example wallet isn't connected. We do nothing
 */
export function useAuthOpenedModal() {
    const { isConnected } = useAccount();
    const { accessToken, acceptedRules } = useUserStore(state => ({
        accessToken: state.accessToken,
        acceptedRules: state.acceptedRules
    }));

    if (!isConnected) {
        return undefined;
    }

    if (!accessToken) {
        return AuthModal.SIGN;
    }

    if (!acceptedRules) {
        return AuthModal.AGREE;
    }

    return undefined;
}