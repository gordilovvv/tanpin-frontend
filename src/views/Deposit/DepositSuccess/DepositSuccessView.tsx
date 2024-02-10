import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/uikit';
import { Container, PageWrapper } from '@/components/Layout';
import Confetti from 'react-dom-confetti';
import { ConfettiConfig } from 'react-dom-confetti';
import { Cat } from './Cat';
import { useTranslation } from '@/localization';
import styles from './DepositSuccessView.module.scss';

export function DepositSuccessView() {
    const { t } = useTranslation();
    const [launchConfetti, setLaunchConfetti] = useState(false);

    const confettiConfig = useMemo<ConfettiConfig>(() => {
        return {
            angle: 90,
            spread: 240,
            startVelocity: 60,
            elementCount: 90,
            dragFriction: 0.15,
            duration: 3810,
            stagger: 3,
            width: '16px',
            height: '16px',
            perspective: '700px',
            colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
        };
    }, []);

    useEffect(() => {
        const rootElement = document.getElementById('root');
        const launch = () => {
            setLaunchConfetti(true);
        };

        if (rootElement && rootElement.firstElementChild) {
            const element = rootElement.firstElementChild as HTMLElement;

            element.style.overflow = 'hidden';
            window.addEventListener('load', launch);

            return () => {
                element.style.overflow = '';
                window.removeEventListener('load', launch);
            };
        }
    }, []);

    return (
        <PageWrapper hasPaddingTop={false}>
            <Container className={styles.container}>
                <div className={styles.confetti}>
                    <Confetti
                        active={launchConfetti}
                        config={confettiConfig}
                    />
                </div>

                <div className={styles.success}>
                    <Cat className={styles.img} />

                    <div className={styles.body}>
                        <div className={styles.successTitle}>
                            {t('You’ve')} <span>{t('successfully')}</span> <br />
                            {t('bought %currency%', { currency: 'USDT' })}
                        </div>

                        <Button to='/'>
                            {t('Explore Tanpin')}
                        </Button>
                    </div>
                </div>
            </Container>
        </PageWrapper>

    );
}