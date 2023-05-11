const twoNumbersFormatter = (num: number) => {
    return num < 10 ? `0${num}` : num;
};

const HOUR_IN_MS = 3600000;
const HOURS_THRESHOLD_MS = 172800000;

export function formatElapsedTime(timeMS: number) {
    if (timeMS < HOURS_THRESHOLD_MS) {
        const hours = Math.floor(timeMS / HOUR_IN_MS);
        const minutes = Math.floor(timeMS % HOUR_IN_MS / 60000);
        const seconds = Math.floor(timeMS % 60000 / 1000);

        return `${hours}:${twoNumbersFormatter(minutes)}:${twoNumbersFormatter(seconds)}`;
    }

    return `${Math.floor(timeMS / 86400000)} days`;
}