import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/Menus';
import LayoutContainer from '../LayoutContainer';
import ErrorBoundary from '@/components/ErrorBoundary';
import styles from './PageLayout.module.scss';

export function PageLayout() {
    return (
        <LayoutContainer>
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
        </LayoutContainer>
    );
}
