import BigNumber from 'bignumber.js';

const SMALLEST = new BigNumber(1e-7);
const NEGATIVE_ONE = new BigNumber(-1);
const ONE = new BigNumber(1);
const ZERO = new BigNumber(0);
const ZERO_POINT_ONE = new BigNumber(0.1);

export function formatTokenAmount(value: string | number) {
    const roundDown = BigNumber.ROUND_DOWN;
    const tokenValue = new BigNumber(value);

    if (tokenValue.isInteger())
        return tokenValue.toFixed();

    const absolute = tokenValue.absoluteValue();
    const integer = absolute.integerValue(roundDown);
    const diff = absolute.minus(integer);

    if (diff.isGreaterThanOrEqualTo(ZERO_POINT_ONE))
        return tokenValue.decimalPlaces(2, roundDown).toFixed();

    if (integer.isGreaterThan(ZERO) && diff.isLessThan(SMALLEST))
        return tokenValue.integerValue(roundDown).toFixed();

    const multipliedBy = tokenValue.isLessThan(ZERO)
        ? NEGATIVE_ONE
        : ONE;
    
    return integer.plus(diff.precision(2, roundDown)).times(multipliedBy).toFixed();
}