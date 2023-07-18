import { Container, PageWrapper } from '@/components/Layout';
import { Button } from '@/uikit';
import { Sad } from './Sad';
import styles from './DepositRejectedView.module.scss';

export function DepositRejectedView() {
    return (
        <PageWrapper>
            <Container
                space
                className={styles.container}
            >
                <div className={styles.wrap}>
                    <Sad
                        className={styles.img}
                    />

                    <div className={styles.body}>
                        <div className={styles.titleWrap}>
                            <div className={styles.title}>
                                Failed to finish your purchace
                            </div>

                            <div className={styles.subtitle}>
                                Try again a bit later
                            </div>
                        </div>

                        <Button to="/">Go to homepage</Button>
                    </div>
                </div>
            </Container>
        </PageWrapper>
    );
}


