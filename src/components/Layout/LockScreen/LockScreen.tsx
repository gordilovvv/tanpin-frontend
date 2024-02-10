
import promoImg from '@/app/assets/images/crystal.png';
import styles from './LockScreen.module.scss';
import { Logo } from '@/uikit';
import { Container } from '..';
import { useTranslation } from '@/localization';

export function LockScreen() {
    const { t } = useTranslation();

    return (
        <div
            className={styles.lockScreen}
            style={{ backgroundImage: `url(${promoImg})` }}
        >
            <Container maxWidth={600}>
                <div className={styles.body}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>

                    <div className={styles.title}>
                        <span>{t('Tech works')}</span>
                    </div>

                    <div className={styles.description}>
                        {t('We are cleaning our gallery.')}<br />{t('Just optimized database and collect new blocks')}
                    </div>
                </div>
            </Container>
        </div>
    );
}