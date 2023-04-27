import { polygon, polygonMumbai } from 'wagmi/chains';

/**
 * Change this const to switch network mode
 */
export const network: 'mainnet' | 'testnet' = 'mainnet';

export const activeChain = network === 'mainnet' ? polygon : polygonMumbai;
export const activeChainId = activeChain.id;

export const PUBLIC_NODES = {
    [polygon.id]: 'https://polygon.llamarpc.com',
    [polygonMumbai.id]: 'https://polygon-testnet.public.blastapi.io'
} as Record<number, string>;