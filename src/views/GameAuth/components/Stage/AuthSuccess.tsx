import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Confetti, { ConfettiConfig } from 'react-dom-confetti';
import { useTranslation } from '@/localization';
import styles from './AuthSuccess.module.scss';

export function AuthSuccess() {
    const { t } = useTranslation();
    const [launchConfetti, setLaunchConfetti] = useState(false);

    const confettiConfig = useMemo(() => {
        return {
            angle: 90,
            spread: 150,
            startVelocity: 160,
            elementCount: 80,
            dragFriction: 0.25,
            duration: 3200,
            stagger: 6,
            width: '12px',
            height: '12px',
            perspective: '572px',
            colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
        } as ConfettiConfig;
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLaunchConfetti(true);
        }, 250);
    }, []);

    return (
        <div className={styles.wrap}>
            <div className={styles.confetti}>
                <Confetti
                    active={launchConfetti}
                    config={confettiConfig}
                />
            </div>

            <div className={styles.bottom}>
                <Link
                    to='/'
                    className={styles.link}
                >
                    {t('Home')}
                </Link>
            </div>
        </div>
    );
}