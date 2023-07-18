import { Container, PageWrapper, } from '@/components/Layout';
import { BuyForm } from './components/Form/BuyForm';
import styles from './DepositView.module.scss';

export function DepositView() {
    return (
        <PageWrapper>
            <Container
                className={styles.container}
                space
            >
                <div className={styles.wrap}>
                    <div className={styles.title}>
                        Buy USDT
                    </div>

                    <BuyForm />
                </div>
            </Container>
        </PageWrapper >
    );
}