import { Chain, polygon } from 'wagmi/chains';

export const polygonAmoy: Chain = {
    id: 80_002,
    name: 'Polygon Amoy',
    network: 'matic',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-amoy.polygon.technology'],
        },
        public: {
            http: ['https://rpc-amoy.polygon.technology']
        }
    },
    blockExplorers: {
        default: {
            name: 'OK LINK',
            url: 'https://www.oklink.com/amoy',
        },
    },
    testnet: true,
};

/**
 * Change this const to switch network mode
 */
export const network: 'mainnet' | 'testnet' = 'mainnet';

// @ts-ignore
export const activeChain = network === 'mainnet' ? polygon : polygonAmoy;
export const activeChainId = activeChain.id;

export const PUBLIC_NODES = {
    [polygon.id]: [
        import.meta.env.VITE_PUBLIC_NODE_MAINNET,
        'https://polygon-rpc.com',
    ],
    [polygonAmoy.id]: [
        import.meta.env.VITE_PUBLIC_NODE_TESTNET,
    ]
} as Record<number, string[]>;

export const EXPLORER_URL = {
    [polygon.id]: {
        address: 'https://polygonscan.com/address/{ADDRESS}',
        token: 'https://polygonscan.com/token/{ADDRESS}',
        transaction: 'https://polygonscan.com/tx/{TX_HASH}'
    },
    [polygonAmoy.id]: {
        address: 'https://www.oklink.com/ru/amoy/address/{ADDRESS}',
        token: 'https://www.oklink.com/ru/amoy/address/{ADDRESS}',
        transaction: 'https://www.oklink.com/ru/amoy/tx/{TX_HASH}'
    },
} as Record<number, {
    address: string
    token: string
    transaction: string
}>;