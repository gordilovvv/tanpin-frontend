import { polygon, polygonMumbai } from 'wagmi/chains';

/**
 * Change this const to switch network mode
 */
export const network: 'mainnet' | 'testnet' = 'testnet';

// @ts-ignore
export const activeChain = network === 'mainnet' ? polygon : polygonMumbai;
export const activeChainId = activeChain.id;

export const PUBLIC_NODES = {
    [polygon.id]: [
        'https://polygon.llamarpc.com'
    ],
    [polygonMumbai.id]: [
        'https://polygon-testnet.public.blastapi.io'
    ]
} as Record<number, string[]>;

export const EXPLORER_URL = {
    [polygon.id]: {
        address: 'https://polygonscan.com/address/{ADDRESS}',
        transaction: 'https://polygonscan.com/tx/{TX_HASH}'
    },
    [polygonMumbai.id]: {
        address: 'https://mumbai.polygonscan.com/address/{ADDRESS}',
        transaction: 'https://mumbai.polygonscan.com/tx/{TX_HASH}'
    },
} as Record<number, {
    address: string
    transaction: string
}>;