import { PropsWithChildren } from 'react';
import { Container } from './Container';
import styles from './AuthContainer.module.scss';

type AuthContainerProps = {
    background: string
}

export function AuthContainer({ background, children }: PropsWithChildren<AuthContainerProps>) {
    return (
        <div className={styles.wrap}>
            <div
                className={styles.background}
                style={{ backgroundImage: `url(${background})` }}
            ></div>

            <Container>
                <div className={styles.content}>
                    {children}
                </div>
            </Container>
        </div>
    );
}