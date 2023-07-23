import { useEffect, useMemo, useState } from 'react';
import Confetti, { ConfettiConfig } from 'react-dom-confetti';
import styles from './SuccessStage.module.scss';

export function SuccessStage() {
    const [launchConfetti, setLaunchConfetti] = useState(false);

    const confettiConfig = useMemo(() => {
        return {
            angle: 216,
            spread: 320,
            startVelocity: 50,
            elementCount: 75,
            dragFriction: 0.18,
            duration: 3000,
            stagger: 3,
            width: '10px',
            height: '10px',
            perspective: '681px',
            colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
        } as ConfettiConfig;
    }, []);

    useEffect(() => {
        setLaunchConfetti(true);
    }, []);

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.confetti}>
                    <Confetti
                        active={launchConfetti}
                        config={confettiConfig}
                    />
                </div>

                <div className={styles.content}>
                    <div className={styles.title}>
                        Connection successful
                    </div>

                    <div className={styles.text}>
                        You can now return to the game
                    </div>
                </div>
            </div>
        </>
    );
}