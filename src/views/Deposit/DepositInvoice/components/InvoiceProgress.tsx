import { useEffect, useState } from 'react';
import styles from './InvoiceProgress.module.scss';
import classNames from 'classnames';

type InvoiceProgressProps = {
    expiresTimestamp: number,
    className?: string,
    onExpire?: () => void
}

const orderTTL = 15 * 60_000;

export function InvoiceProgress({ expiresTimestamp, className, onExpire }: InvoiceProgressProps) {
    const [now, setNow] = useState(Date.now());

    const diff = Math.abs(now - expiresTimestamp);
    const progress = ((orderTTL - diff) / orderTTL);
    const progressWidth = now < expiresTimestamp ? Math.max(0.04, progress) : 1;

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date().getTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (now > expiresTimestamp) {
            onExpire?.();
        }
    }, [now, expiresTimestamp, onExpire]);

    return (
        <div className={classNames(styles.progress, className)}>
            <div
                className={styles.line}
                style={{ transform: `scaleX(${progressWidth})` }}
            ></div>
        </div>
    );
}