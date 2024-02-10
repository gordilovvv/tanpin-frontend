import { EN, RU, defaultLanguage } from '@/localization';

export const daysSuffix = {
    [EN.locale]: ['day', 'days', 'days'],
    [RU.locale]: ['день', 'дня', 'дней']
};

export const editionsSuffix = {
    [EN.locale]: ['edition', 'editions', 'editions'],
    [RU.locale]: ['копия', 'копии', 'копий']
};

export const editionsPurchaseSuffix = {
    [EN.locale]: ['edition', 'editions', 'editions'],
    [RU.locale]: ['копию', 'копии', 'копий']
};

export function pluralize(num: number, locale: string, suffixes: Record<string, string[]>) {
    const [singular, genitiveSingular, plural] = suffixes[locale] ?? suffixes[defaultLanguage.locale];

    if (locale === RU.locale) {
        const lastTwoDigits = num % 100;

        if (num === 1) {
            return singular;
        } else if (lastTwoDigits > 10 && lastTwoDigits < 20) {
            return plural;
        } else {
            const lastDigit = num % 10;
            if (lastDigit === 1) {
                return singular;
            } else if (lastDigit >= 2 && lastDigit <= 4) {
                return genitiveSingular;
            } else {
                return plural;
            }
        }
    } else {
        if (num === 1) {
            return singular;
        } else {
            return plural;
        }
    }
}   