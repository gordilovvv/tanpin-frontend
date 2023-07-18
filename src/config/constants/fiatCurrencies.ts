export type FiatCurrency = {
    almostZero: string,
    code: string,
    locale: string,
    name: string,
    symbol: string,
    sign: string,
    modifyParts?: (parts: any) => any
}

export const fiatCurrencies: Record<'rub' | 'usd', FiatCurrency> = {
    rub: {
        almostZero: '~0,00 ₽',
        code: 'rub',
        locale: 'ru',
        name: 'russianRuble',
        symbol: 'RUB',
        sign: '₽',
    },
    usd: {
        almostZero: '~$0.00',
        code: 'usd',
        locale: 'en-US',
        name: 'usDollar',
        symbol: 'USD',
        sign: '$',
    }
};