import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from '@/localization';
import { formatElapsedTime } from '@/utils/date';

type AuctionTimeProps = {
    endDate: string
}

export const AuctionTime = memo(({ endDate }: AuctionTimeProps) => {
    const { t, locale } = useTranslation();
    const date = useMemo(() => {
        return new Date(endDate);
    }, [endDate]);

    const [elapsedTime, setElapsedTime] = useState<string>(
        formatElapsedTime(date.getTime() - Date.now(), locale)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const msLeft = date.getTime() - Date.now();

            if (msLeft <= 0) {
                setElapsedTime(t('Timed out'));
            } else {
                setElapsedTime(formatElapsedTime(msLeft, locale));
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [date]);

    return (<>{elapsedTime}</>);
});

AuctionTime.displayName = 'AuctionTime';