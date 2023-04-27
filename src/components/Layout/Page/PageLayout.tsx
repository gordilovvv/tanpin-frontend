import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/Menus';
import styles from './PageLayout.module.scss';
import ErrorBoundary from '@/components/ErrorBoundary';
import { SignMessageModal, WelcomeModal } from '@/components/Modals';
import { AuthModal, useAuthOpenedModal } from '@/states/user/hooks/useAuth';

export function PageLayout() {
    const authOpenedModal = useAuthOpenedModal();

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

            <SignMessageModal isOpen={authOpenedModal === AuthModal.SIGN} />
            <WelcomeModal isOpen={authOpenedModal === AuthModal.AGREE} />
        </div>
    );
}
