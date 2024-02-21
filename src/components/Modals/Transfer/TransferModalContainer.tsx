import { useCallback, useEffect } from 'react';
import { ModalProps } from '@/uikit';
import { TransferModal } from './TransferModal';
import { TransferSuccessModal } from './Success/TransferSuccessModal';
import { ErrorMessageModal } from '../ErrorMessage/ErrorMessageModal';
import { useLocation } from 'react-router-dom';
import { useTransferStore } from '@/states/transfer/store';

export function TransferModalContainer(props: ModalProps) {
    const location = useLocation();
    const [transactionSent, transactionError, replaceState] = useTransferStore(state => [
        state.transactionSent,
        state.transactionError,
        state.replaceState
    ]);

    const handleCloseStateModal = useCallback(() => {
        replaceState({
            transactionError: undefined,
            transactionSent: undefined
        });
    }, [replaceState]);

    useEffect(() => {
        props.onClose?.();
    }, [location]);

    return (
        <>
            <TransferModal {...props} />

            <TransferSuccessModal
                isOpen={!!transactionSent}
                amount={transactionSent?.amount}
                hash={transactionSent?.hash}
                onClose={handleCloseStateModal}
            />

            <ErrorMessageModal
                isOpen={!!transactionError}
                error={transactionError}
                onClose={handleCloseStateModal}
            />
        </>
    );
}