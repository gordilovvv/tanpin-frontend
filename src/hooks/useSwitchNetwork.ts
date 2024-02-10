import { useCallback, useMemo, useState } from 'react';
import { useAccount, useSwitchNetwork as useSwitchNetworkWagmi } from 'wagmi';
import { ConnectorNames } from '@/config/wallet';
import { useTranslation } from '@/localization';
import { logError } from '@/utils/sentry';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';

export function useSwitchNetwork() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>('');
    const { isConnected, connector } = useAccount();
    const {
        switchNetworkAsync: _switchNetworkAsync,
        isLoading: _isLoading,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error: _,
        ...switchNetworkArgs
    } = useSwitchNetworkWagmi();

    const isLoading = _isLoading || loading;

    const switchNetworkAsync = useCallback(async (chainId: number) => {
        if (isConnected && typeof _switchNetworkAsync === 'function') {
            if (isLoading) {
                return;
            }

            setError(undefined);
            setLoading(true);

            try {
                const res = await _switchNetworkAsync(chainId);

                return res;
            } catch (error) {
                setError(walletErrorToUserReadableMessage(error, t));
                logError(error);
            } finally {
                setLoading(false);
            }
        }
    }, [isConnected, _switchNetworkAsync, isLoading, setLoading, setError, t]);

    const canSwitch = useMemo(
        () => {
            const switchSupported = !!_switchNetworkAsync;
            const connectorNotWalletConnect = connector?.id !== ConnectorNames.WalletConnect;
            // @ts-ignore
            const isSafePalOrMathWallet = (typeof window !== 'undefined' && (window.ethereum?.isSafePal || window.ethereum?.isMathWallet));

            return isConnected
                ? switchSupported && connectorNotWalletConnect && !isSafePalOrMathWallet
                : true;
        },
        [_switchNetworkAsync, isConnected, connector]
    );

    return {
        ...switchNetworkArgs,
        error,
        switchNetworkAsync,
        isLoading,
        canSwitch
    };
}