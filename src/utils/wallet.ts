import { Address } from 'wagmi';

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export async function registerToken(params: {
    tokenAddress: string,
    tokenSymbol: string,
    tokenDecimals: number,
    tokenLogo?: string,
}): Promise<boolean> {
    const { tokenAddress, tokenDecimals, tokenSymbol, tokenLogo } = params;
    const tokenAdded = await window.ethereum?.request({
        method: 'wallet_watchAsset',
        params: {
            type: 'ERC20',
            options: {
                address: tokenAddress as Address,
                symbol: tokenSymbol,
                decimals: tokenDecimals,
                image: tokenLogo
            },
        },
    });

    return !!tokenAdded;
}

export const canRegisterToken = () =>
    typeof window !== 'undefined' &&
    // @ts-ignore
    !window?.ethereum?.isSafePal &&
    (window?.ethereum?.isMetaMask ||
        window?.ethereum?.isTrust ||
        window?.ethereum?.isCoinbaseWallet ||
        window?.ethereum?.isTokenPocket);