import { configureChains, createConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { TrustWalletConnector } from '@/utils/trustWalletConnector';
import { PUBLIC_NODES, activeChain } from './chain';

export const { publicClient, chains } = configureChains(
    [activeChain],
    [
        infuraProvider({
            apiKey: import.meta.env.VITE_INFURA_API_KEY
        }),
        // Public nodes
        ...PUBLIC_NODES[activeChain.id]
            .map(nodeUrl => jsonRpcProvider<typeof activeChain>({
                rpc: () => {
                    return { http: nodeUrl };
                }
            }))
    ],
    {
        batch: {
            multicall: {
                batchSize: 1024 * 200
            }
        }
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
