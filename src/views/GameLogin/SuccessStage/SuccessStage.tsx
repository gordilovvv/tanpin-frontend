import { useEffect, useMemo, useState } from 'react';
import Confetti, { ConfettiConfig } from 'react-dom-confetti';
import styles from './SuccessStage.module.scss';
import { Logo } from '@/uikit';

export function SuccessStage() {
    const [launchConfetti, setLaunchConfetti] = useState(false);

    const confettiConfig = useMemo<ConfettiConfig>(() => {
        return {
            angle: 75,
            spread: 240,
            startVelocity: 50,
            elementCount: 90,
            dragFriction: 0.18,
            duration: 3810,
            stagger: 3,
            width: '16px',
            height: '16px',
            perspective: '700px',
            colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
        };
    }, []);

    useEffect(() => {
        setLaunchConfetti(true);
    }, []);

    return (
        <>
            <Confetti
                active={launchConfetti}
                config={confettiConfig}
            />

            <Logo className={styles.logo} />
            <div className={styles.title}> Connection successful</div>
            <div className={styles.info}>You can now return to the game</div>
        </>
    );
}