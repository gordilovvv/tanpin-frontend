import { CountDownData, CountdownLetter } from '@/components/Countdown';
import { useTranslation } from '@/localization';
import styles from './ExpiresCountdown.module.scss';

type ExpiresCountdownProps = {
    countdown: CountDownData
    end?: boolean
}

export function ExpiresCountdown({ countdown, end }: ExpiresCountdownProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.countdown}>
            <div className={styles.label}>
                {t('Expiration date')}:
            </div>

            {end
                ? <div className={styles.letters}>
                    00:00:00
                </div>
                : <div className={styles.letters}>
                    <CountdownLetter
                        count={countdown.hours}
                        className={styles.letter}
                    />
                    :
                    <CountdownLetter
                        count={countdown.minutes}
                        className={styles.letter}
                    />
                    :
                    <CountdownLetter
                        count={countdown.seconds}
                        className={styles.letter}
                    />
                </div>}
        </div>
    );
}