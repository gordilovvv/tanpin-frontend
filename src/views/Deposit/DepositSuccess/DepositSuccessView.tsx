import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/uikit';
import { Container, PageWrapper } from '@/components/Layout';
import Confetti from 'react-dom-confetti';
import { ConfettiConfig } from 'react-dom-confetti';
import cat from '@/app/assets/img/cat2.svg';
import styles from './DepositSuccessView.module.scss';

export function DepositSuccessView() {
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
        const launch = () => {
            setLaunchConfetti(true);
        };

        window.addEventListener('load', launch);

        return () => {
            window.removeEventListener('load', launch);
        };
    }, []);

    return (
        // TODO: Конфети вылезают за страницу
        <PageWrapper>
            {<Container className={styles.success}>
                <img
                    src={cat}
                    className={styles.img}
                />

                <div className={styles.body}>
                    <Confetti
                        active={launchConfetti}
                        config={confettiConfig}
                    />

                    <div className={styles.successTitle}>
                        You’ve successfully <br />
                        bought <span>300 USDT</span>
                    </div>

                    <Button>Explore Tanpin</Button>
                </div>

            </Container>
            }

        </PageWrapper>
    );
}