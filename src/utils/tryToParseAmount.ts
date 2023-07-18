import BigNumber from 'bignumber.js';

export function tryToParseAmount(amount?: string) {
    if (!amount)
        return;

    const amountBN = new BigNumber(amount);

    if (amountBN.isNaN())
        return;

    return amountBN;
}