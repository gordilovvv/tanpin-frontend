
import promoImg from '@/app/assets/images/crystal.png';
import styles from './LockScreen.module.scss';
import { Logo } from '@/uikit';
import { Container } from '..';

export function LockScreen() {
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
                        <span>Технические работы</span>
                    </div>

                    <div className={styles.description}>
                        В нашей виртуальной галерее проводятся особые чистки.<br /> Мы оптимизируем базу данных и собираем новые блоки в блокчейн.
                    </div>
                </div>
            </Container>
        </div>
    );
}