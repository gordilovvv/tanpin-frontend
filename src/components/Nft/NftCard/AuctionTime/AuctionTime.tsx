import { memo, useEffect, useMemo, useState } from 'react';
import { formatElapsedTime } from '@/utils/date';

type AuctionTimeProps = {
    endDate: string
}

export const AuctionTime = memo(({ endDate }: AuctionTimeProps) => {
    const date = useMemo(() => {
        return new Date(endDate);
    }, [endDate]);

    const [elapsedTime, setElapsedTime] = useState<string>(
        formatElapsedTime(date.getTime() - Date.now())
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const msLeft = date.getTime() - Date.now();

            if (msLeft <= 0) {
                setElapsedTime('Timed out');
            } else {
                setElapsedTime(formatElapsedTime(msLeft));
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [date]);

    return (<>{elapsedTime}</>);
});

AuctionTime.displayName = 'AuctionTime';