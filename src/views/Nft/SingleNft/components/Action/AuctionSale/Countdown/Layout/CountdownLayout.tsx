import { CountdownLetter } from '../CountdownLetter';
import { CountDownData } from '../types';
import styles from './CountdownLayout.module.scss';

type CountdownLayoutProps = {
    countdown: CountDownData
    end?: boolean
}

export function CountdownLayout({ countdown, end }: CountdownLayoutProps) {
    return (
        <div className={styles.countdown}>
            <CountdownLetter
                count={countdown.days}
                label='d'
                end={end}
                className={styles.letter}
            />

            <CountdownLetter
                count={countdown.hours}
                label='h'
                end={end}
                className={styles.letter}
            />

            <CountdownLetter
                count={countdown.minutes}
                label='m'
                end={end}
                className={styles.letter}
            />

            <CountdownLetter
                count={countdown.seconds}
                label='s'
                end={end}
                className={styles.letter}
            />
        </div>
    );
}