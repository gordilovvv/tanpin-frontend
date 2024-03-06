import { useEffect, useMemo, useState } from 'react';

export type CountDownData = {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    isPast: boolean
}

type CountDownCalculationProps = {
    date: string | number,
    children: (data: CountDownData) => JSX.Element,
    onExpire?: () => void
}

export function CountdownCalculation({ date, children, onExpire }: CountDownCalculationProps) {
    const [now, setNow] = useState(new Date().getTime());

    const dateInstance = useMemo(() => {
        return new Date(date);
    }, [date]);

    const timestamp = dateInstance.getTime();
    const diff = Math.abs(now - timestamp);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date().getTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (now > timestamp) {
            onExpire?.();
        }
    }, [now, timestamp, onExpire]);

    return (
        <>
            {children({
                days: Math.floor(diff / 86400000),
                hours: Math.floor(diff % 86400000 / 3600000),
                minutes: Math.floor(diff % 3600000 / 60000),
                seconds: Math.floor(diff % 60000 / 1000),
                isPast: now > timestamp
            })}
        </>
    );
}