import BigNumber from 'bignumber.js';

/**
     * Format value to smallest
     */
export function formatValueToRaw(num: string | number, decimals: number) {
    return new BigNumber(num)
        .times(
            new BigNumber(10)
                .pow(decimals)
        ).toFixed();
}
    
/**
     * Format value to normal
     */
export function formatValueFromRaw(num: string | number, decimals: number) {
    return new BigNumber(num)
        .div(
            new BigNumber(10)
                .pow(decimals)
        ).toFixed();
}