import { Container, PageWrapper } from '@/components/Layout';
import { Button } from '@/uikit';
import { Sad } from './Sad';
import { useTranslation } from '@/localization';
import styles from './DepositRejectedView.module.scss';

export function DepositRejectedView() {
    const { t } = useTranslation();

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
                                {t('Failed to finish your purchase')}
                            </div>

                            <div className={styles.subtitle}>
                                {t('Try again a bit later')}
                            </div>
                        </div>

                        <Button to="/">{t('Go to homepage')}</Button>
                    </div>
                </div>
            </Container>
        </PageWrapper>
    );
}


