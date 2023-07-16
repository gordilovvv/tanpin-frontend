import { PropsWithChildren } from 'react';
import { PendingTransactionModal, SignMessageModal, WelcomeModal, WrongNetworkModal } from '@/components/Modals';
import { usePendingTransactionModal, useWrongNetworkModal } from '@/states/global/hooks';
import { AuthModal, useAuthOpenedModal } from '@/states/user/hooks/useAuth';

export function Modals({ children }: PropsWithChildren<unknown>) {
    const authOpenedModal = useAuthOpenedModal();
    const wrongNetworkModal = useWrongNetworkModal();
    const pendingTransactionModal = usePendingTransactionModal();

    return (
        <>
            {children}
            <SignMessageModal isOpen={authOpenedModal === AuthModal.SIGN} />
            <WelcomeModal isOpen={authOpenedModal === AuthModal.AGREE} />

            <PendingTransactionModal
                isOpen={pendingTransactionModal.isOpen}
                hash={pendingTransactionModal.hash}
                text={pendingTransactionModal.text}
                onReject={pendingTransactionModal.onReject}
                onReceipt={pendingTransactionModal.onReceipt}
                onClose={pendingTransactionModal.close}
            />

            <WrongNetworkModal
                isOpen={wrongNetworkModal.isOpen}
                onClose={wrongNetworkModal.close}
            />
        </>
    );
}