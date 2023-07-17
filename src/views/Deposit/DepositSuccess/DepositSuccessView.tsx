import { Container, PageWrapper } from '@/components/Layout';
import styles from './DepositSuccessView.module.scss';
import Confetti from 'react-dom-confetti';
import cat from '@/app/assets/img/cat2.svg';
import { useEffect, useState } from 'react';
import { Button } from '@/uikit';

const config = {
    angle: 90,
    spread: 360,
    startVelocity: 100,
    elementCount: 160,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 10,
    width: '50px',
    height: '15px',
    perspective: '500px',
    colors: ['#3CE361', '#3ce36199', '#3ce361d9', '#3ce36159']
};


export function DepositSuccessView() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <PageWrapper style={{ justifyContent: 'center' }}>
            {<Container className={styles.success}>
                <img
                    src={cat}
                    className={styles.img}
                />

                <div className={styles.body}>
                    <div className={styles.successTitle}>
                        <Confetti
                            active={isMounted}
                            config={config}
                        />

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