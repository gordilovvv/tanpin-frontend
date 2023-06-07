import { APP_URL } from './index';
import { Coinbase, InjectedWallet, Metamask, SafePal, TrustWallet, WalletConnect } from '@/uikit';
import { getTrustWalletProvider } from '@/utils/trustWalletConnector';
import type { ExtendEthereum } from 'global';

export enum ConnectorNames {
    MetaMask = 'metaMask',
    Injected = 'injected',
    WalletConnect = 'walletConnectLegacy',
    WalletLink = 'coinbaseWallet',
    TrustWallet = 'trustWallet',
}

const isMetamaskInstalled = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    if (window.ethereum?.isMetaMask) {
        return true;
    }

    if (window.ethereum?.providers?.some((p) => p.isMetaMask)) {
        return true;
    }

    return false;
};

export type WalletConfig = {
    id: string
    title: string
    icon: (...args: any) => JSX.Element,
    connectorId: ConnectorNames
    deepLink?: string
    installed?: boolean
    guide?: string
    downloadLink?: string
    mobileOnly?: boolean
    qrCode?: () => Promise<string>
}

const walletsConfig = (): WalletConfig[] => {
    return [
        {
            id: 'metamask',
            title: 'Metamask',
            icon: Metamask,
            get installed() {
                return isMetamaskInstalled();
            },
            connectorId: ConnectorNames.MetaMask,
            deepLink: 'https://metamask.app.link/dapp/tanpin.io'
        },
        {
            id: 'coinbase',
            title: 'Coinbase Wallet',
            icon: Coinbase,
            connectorId: ConnectorNames.WalletLink,
        },
        {
            id: 'trust',
            title: 'Trust Wallet',
            icon: TrustWallet,
            connectorId: ConnectorNames.TrustWallet,
            get installed() {
                return !!getTrustWalletProvider();
            },
            deepLink: `https://link.trustwallet.com/open_url?coin_id=20000714&url=${ APP_URL }`,
        },
        {
            id: 'walletconnect',
            title: 'WalletConnect',
            icon: WalletConnect,
            connectorId: ConnectorNames.WalletConnect,
        },
        {
            id: 'safepal',
            title: 'SafePal',
            icon: SafePal,
            connectorId: ConnectorNames.Injected,
            get installed() {
                return typeof window !== 'undefined' && Boolean((window.ethereum as ExtendEthereum)?.isSafePal);
            },
        }
    ];
};

export const createWallets = () => {
    const hasInjected = typeof window !== 'undefined' && !window.ethereum;
    const config = walletsConfig();

    return hasInjected && config.some((c) => c.installed && c.connectorId === ConnectorNames.Injected)
        ? config
        : [
            ...config,
            // Add injected icon if none of injected type wallets installed
            {
                id: 'injected',
                title: 'Injected',
                icon: InjectedWallet,
                connectorId: ConnectorNames.Injected,
                installed: typeof window !== 'undefined' && Boolean(window.ethereum),
            }
        ];
};