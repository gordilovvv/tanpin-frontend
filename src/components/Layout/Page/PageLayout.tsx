import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/Menus';
import styles from './PageLayout.module.scss';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Modals } from './Modals';

export function PageLayout() {
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
