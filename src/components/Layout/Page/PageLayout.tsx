import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/Menus';
import styles from './PageLayout.module.scss';
import ErrorBoundary from '@/components/ErrorBoundary';
import { SignMessageModal, WelcomeModal } from '@/components/Modals';
import { AuthModal, useAuthOpenedModal } from '@/states/user/hooks/useAuth';
import { PendingTransactionModal } from '@/components/Modals/PendingTransaction/PendingTransactionModal';
import { usePendingTransactionModal } from '@/states/global/hooks';

export function PageLayout() {
    const authOpenedModal = useAuthOpenedModal();
    const pendingTransactionModal = usePendingTransactionModal();

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

            <PendingTransactionModal
                isOpen={pendingTransactionModal.isOpen}
                hash={pendingTransactionModal.hash}
                text={pendingTransactionModal.text}
                onClose={pendingTransactionModal.close}
            />
        </div>
    );
}
