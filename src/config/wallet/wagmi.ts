import { configureChains, createClient } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
import { PUBLIC_NODES, activeChain } from '../chain';
import { TrustWalletConnector } from '@/utils/trustWalletConnector';
import { infuraProvider } from 'wagmi/providers/infura';

export const { provider, chains } = configureChains(
    [activeChain],
    [
        infuraProvider({
            apiKey: import.meta.env.VITE_INFURA_API_KEY,
            priority: 0
        }),
        jsonRpcProvider({
            rpc: (chain) => {
                const http = PUBLIC_NODES[chain.id] ?? chain.rpcUrls.default.http[0];
                
                return { http };
            },
            priority: 1
        })
    ]
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
 
export const walletConnectConnector = new WalletConnectLegacyConnector({
    chains,
    options: {
        // @ts-ignore
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID as string,
        qrcode: true
    }
});

export const metaMaskConnector = new MetaMaskConnector({
    chains,
    options: {
        shimDisconnect: true,
        // @ts-ignore
        shimChainChangedDisconnect: false
    }
});

export const trustWalletConnector = new TrustWalletConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true
    },
});

export const client = createClient({
    autoConnect: true,
    provider,
    connectors: [
        metaMaskConnector,
        injectedConnector,
        coinbaseConnector,
        walletConnectConnector,
        trustWalletConnector
    ]
});
