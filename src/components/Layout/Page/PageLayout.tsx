import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/Menus';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Modals } from './Modals';
import { useAccountEventListener } from '@/hooks/useAccountEventListener';
import styles from './PageLayout.module.scss';

export function PageLayout() {
    useAccountEventListener();

    return (
        <Modals>
            <div className={styles.page}>
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
    );
}
