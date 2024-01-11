type DateFormat = 'full' | 'day' | 'time';

const dateFormats: Record<DateFormat, (locale: string) => Intl.DateTimeFormat> = {
    'full': (locale: string) => new Intl.DateTimeFormat(locale, {
        hour12: false,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }),
    'day': (locale: string) => new Intl.DateTimeFormat(locale, {
        month: 'long',
        day: 'numeric'
    }),
    'time': (locale: string) => new Intl.DateTimeFormat(locale, {
        hour12: locale !== 'ru',
        hour: '2-digit',
        minute: '2-digit'
    })
};

function getFormatter(locale: string, type: DateFormat) {
    return dateFormats[type](locale);
}

export function formatDate(
    value: string | number,
    { type = 'full' }: { type?: DateFormat } = {}
) {
    const msValue = new Date(value).getTime();
    const formatter = getFormatter('en', type);

    return formatter.format(msValue);
}

const twoNumbersFormatter = (num: number) => {
    return num < 10 ? `0${num}` : num;
};

const HOUR_IN_MS = 3600000;
const HOURS_THRESHOLD_MS = 172800000;

export function formatElapsedTime(timeMS: number) {
    if (timeMS < HOURS_THRESHOLD_MS) {
        const hours = Math.floor(timeMS / HOUR_IN_MS);
        const minutes = Math.floor((timeMS % HOUR_IN_MS) / 60000);
        const seconds = Math.floor((timeMS % 60000) / 1000);

        return `${hours}:${twoNumbersFormatter(minutes)}:${twoNumbersFormatter(seconds)}`;
    }

    return `${Math.floor(timeMS / 86400000)} days`;
}
