import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/Menus';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Modals } from './Modals';
import { ScrollTopOnMount } from '@/app/routing/ScrollTopOnMount';
import promoImg from './promo.png';
import { useAccountEventListener } from '@/hooks/useAccountEventListener';
import styles from './PageLayout.module.scss';
import { LOCK_MARKET } from '@/config';
import { UnstyleLink } from '@/uikit';

export function PageLayout() {
    useAccountEventListener();

    if (LOCK_MARKET) {
        return (
            <div
                className={styles.lockScreen}
                style={{ backgroundImage: `url(${promoImg})` }}
            >
                <div className={styles.title}>
                    Открытие уже совсем <span>скоро!</span>
                </div>

                <div className={styles.description}>
                    Чтобы не пропустить момент, <UnstyleLink
                        href='https://nftgta.io/'
                        target='_blank'
                        className={styles.link}
                    >скачайте</UnstyleLink> лаучер и приготовьтесь заранее!
                </div>
            </div>
        );
    }

    return (
        <ScrollTopOnMount>
            <Modals>
                <div
                    className={styles.page}
                    style={{ overflow: 'hidden' }}
                >
                    <div className={styles.content}>
                        <Header />

                        <div className={styles.main}>
                            <ErrorBoundary>
                                <Outlet />
                            </ErrorBoundary>
                        </div>

                        <Footer />
                    </div>
                </div>
            </Modals>
        </ScrollTopOnMount>
    );
}
