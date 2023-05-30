import { EXPLORER_URL, activeChainId } from '@/config/chain';

export function getAddressExplorerURL(address: string): string {
    return EXPLORER_URL[activeChainId].address.replace('{ADDRESS}', address);
}

export function getTransactionExplorerURL(transactionHash: string): string {
    return EXPLORER_URL[activeChainId].transaction.replace('{TX_HASH}', transactionHash);
}
