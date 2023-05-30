export function getTransactionExplorerURL(transactionHash: string): string {
    const linkTemplate = 'https://polygonscan.com/tx/{TX_HASH}'; // хотя может пусть лучше тут останется, мб не стоит выносить в конфиг?
    return linkTemplate.replace('{TX_HASH}', transactionHash);
}

export function getAddressExplorerURL(address: string): string {
    const linkTemplate = 'https://polygonscan.com/address/{ADDRESS}';
    return linkTemplate.replace('{ADDRESS}', address);
}
