enum NumberFormat {
    INT = 'int',
    FRACTION = 'fraction'
}

const numberFormats = {
    [NumberFormat.INT]: (locale: string, currencyCode: string) => new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }),
    [NumberFormat.FRACTION]: (locale: string, currencyCode: string) => new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode
    })
};

function getFormatter(locale: string, currencyCode: string, type: NumberFormat = NumberFormat.FRACTION) {
    return numberFormats[type](locale, currencyCode);
}

export function formatFiatCurrency(value: string | number, locale: string, currencyCode: string): string {
    const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
    const formatter = getFormatter(
        locale,
        currencyCode
    );

    return formatter.format(parsedValue);
}