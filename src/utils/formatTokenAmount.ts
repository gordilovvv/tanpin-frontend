import BigNumber from 'bignumber.js';
import { EN, RU, defaultLanguage } from '@/localization';

const SMALLEST = new BigNumber(0.0000001);
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

export function formatTokenAmountV2(value: string | number, locale: string, currency?: string) {
    const numberFormat = new Intl.NumberFormat(locale, {
        maximumFractionDigits: 20
    });
    const formattedValue = numberFormat.format(Number(value));

    return currency
        ? `${formattedValue} ${currency}`
        : formattedValue;
}

const shortFormatter = (locale: string) => Intl.NumberFormat(locale, {
    notation: 'compact'
});

export function formatTokenAmountShort(value: string | number, locale: string) {
    return shortFormatter(locale).format(typeof value === 'string' ? parseFloat(value) : value);
}

enum NumberFormat {
    ERC1155Amount = 'ERC1155Amount'
}

const numberFormats = {
    [NumberFormat.ERC1155Amount]: (locale: string, minimumFractionDigits?: number, maximumFractionDigits?: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'decimal',
            minimumFractionDigits: minimumFractionDigits ?? 0,
            maximumFractionDigits: maximumFractionDigits ?? 0,
            useGrouping: true
        });
    }
};

const numberSuffixes = {
    [EN.locale]: ['K', 'M', 'B', 'T', 'Q'],
    [RU.locale]: [' тыс', ' млн', ' млрд', ' трлн', ' квадр']
};

function formatAmountWithSuffix(format: (amount: number) => string, value: number, locale: string, decimalPlaces = 1) {
    const selectedSuffixes = numberSuffixes[locale] || numberSuffixes[defaultLanguage.locale];

    for (let suffixIndex = selectedSuffixes.length - 1; suffixIndex >= 0; suffixIndex--) {
        const threshold = Math.pow(1e3, suffixIndex + 1);
        if (value <= -threshold || value >= threshold) {
            return `${(value / threshold).toFixed(decimalPlaces)}${selectedSuffixes[suffixIndex]}`;
        }
    }

    return format(value);
}

export function formatERC1155Amount(value: number, locale: string) {
    const noDecimalsFormatter = numberFormats[NumberFormat.ERC1155Amount](locale, 0, 0);

    const decimalsFormatter = {
        one: numberFormats[NumberFormat.ERC1155Amount](locale, 0, 1),
        two: numberFormats[NumberFormat.ERC1155Amount](locale, 0, 2),
    };

    const amountFormatter = (amount: number) => {
        if (amount > 999) {
            return noDecimalsFormatter.format(amount);
        } else if (amount > 10) {
            return decimalsFormatter.one.format(amount);
        } else if (amount === 0) {
            return '0';
        } else {
            return decimalsFormatter.two.format(amount);
        }
    };

    return formatAmountWithSuffix(amountFormatter, value, locale);
}