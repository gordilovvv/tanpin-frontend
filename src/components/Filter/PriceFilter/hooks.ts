import BigNumber from 'bignumber.js';

export function useMinMaxValidation(min: string, max: string) {
    // Empty strings doesn't require validation
    if (min === '' || max === '') {
        return true;
    }

    const minBN = new BigNumber(min);

    if (max !== '' && minBN.isGreaterThan(max)) {
        return false;
    }

    return true;
}