import { polygon, polygonMumbai } from 'wagmi/chains';

/**
 * Change this const to switch network mode
 */
export const network: 'mainnet' | 'testnet' = 'mainnet';

// @ts-ignore
export const activeChain = network === 'mainnet' ? polygon : polygonMumbai;
export const activeChainId = activeChain.id;

export const PUBLIC_NODES = {
    [polygon.id]: [
        import.meta.env.VITE_PUBLIC_NODE_MAINNET,
        'https://polygon-rpc.com',
    ],
    [polygonMumbai.id]: [
        import.meta.env.VITE_PUBLIC_NODE_TESTNET,
    ]
} as Record<number, string[]>;

export const EXPLORER_URL = {
    [polygon.id]: {
        address: 'https://polygonscan.com/address/{ADDRESS}',
        token: 'https://polygonscan.com/token/{ADDRESS}',
        transaction: 'https://polygonscan.com/tx/{TX_HASH}'
    },
    [polygonMumbai.id]: {
        address: 'https://mumbai.polygonscan.com/address/{ADDRESS}',
        token: 'https://mumbai.polygonscan.com/token/{ADDRESS}',
        transaction: 'https://mumbai.polygonscan.com/tx/{TX_HASH}'
    },
} as Record<number, {
    address: string
    token: string
    transaction: string
}>;