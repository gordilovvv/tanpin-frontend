import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/Menus';
import styles from './PageLayout.module.scss';
import ErrorBoundary from '@/components/ErrorBoundary';

export function PageLayout() {
    return (
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
    );
}
