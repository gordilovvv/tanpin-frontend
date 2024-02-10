import { Container, PageWrapper, } from '@/components/Layout';
import { BuyForm } from './components/Form/BuyForm';
import { useTranslation } from '@/localization';
import styles from './DepositView.module.scss';

export function DepositView() {
    const { t } = useTranslation();

    return (
        <PageWrapper>
            <Container
                className={styles.container}
                space
            >
                <div className={styles.wrap}>
                    <div className={styles.title}>
                        {t('Buy %currency%', { currency: 'USDT' })}
                    </div>

                    <BuyForm />
                </div>
            </Container>
        </PageWrapper >
    );
}