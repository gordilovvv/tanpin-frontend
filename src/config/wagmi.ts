import { configureChains, createConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { TrustWalletConnector } from '@/utils/trustWalletConnector';
import { PUBLIC_NODES, activeChain } from './chain';

const mostNodesConfig = Object.values(PUBLIC_NODES).reduce((prev, cur) => {
    return cur.length > prev ? cur.length : prev;
}, 0);

export const { publicClient, chains } = configureChains(
    [activeChain],
    Array.from({ length: mostNodesConfig })
        .map((_, i) => i)
        .map(i => {
            return jsonRpcProvider({
                rpc: (chain) => {
                    const url = PUBLIC_NODES[chain.id]?.[i];

                    return url ? { http: url } : null;
                },
            });
        }),
    {
        batch: {
            multicall: {
                batchSize: 1024 * 200,
                wait: 16,
            },
        },
        pollingInterval: 6_000
    }
);

export const injectedConnector = new InjectedConnector({
    chains,
    options: {
        shimDisconnect: true
    }
});

export const coinbaseConnector = new CoinbaseWalletConnector({
    chains,
    options: {
        appName: 'Tanpin',
        appLogoUrl: 'https://tanpin.io/logo.png',
    }
});

export const walletConnectConnector = new WalletConnectConnector({
    chains,
    options: {
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID as string,
        showQrModal: true
    }
});

export const metaMaskConnector = new MetaMaskConnector({
    chains,
    options: {
        shimDisconnect: true
    }
});

export const trustWalletConnector = new TrustWalletConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true
    },
});

export const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
    connectors: [
        metaMaskConnector,
        injectedConnector,
        coinbaseConnector,
        walletConnectConnector,
        trustWalletConnector
    ]
});
