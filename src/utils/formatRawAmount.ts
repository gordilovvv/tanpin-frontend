import { formatUnits, parseUnits } from 'viem';

/**
 * Format value to smallest
 */
export function formatValueToRaw(num: string | number | bigint, decimals: number) {
    // @ts-ignore
    return parseUnits(`${typeof num === 'bigint' ? num.toString() : num}`, decimals);
}

/**
 * Format value to normal
 */
export function formatValueFromRaw(num: string | number | bigint, decimals: number) {
    return formatUnits(typeof num === 'bigint' ? num : BigInt(num), decimals);
}