import { PropsWithChildren } from 'react';
import { Container } from './Container';
import crystalImg from '@/app/assets/images/crystal.png';
import styles from './AuthContainer.module.scss';

export function AuthContainer({ children }: PropsWithChildren) {
    return (
        <div className={styles.wrap}>
            <div
                className={styles.background}
                style={{ backgroundImage: `url(${crystalImg})` }}
            ></div>

            <Container>
                <div className={styles.content}>
                    {children}
                </div>
            </Container>
        </div>
    );
}