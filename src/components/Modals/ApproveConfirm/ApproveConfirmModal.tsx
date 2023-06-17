import { useCallback } from 'react';
import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { ApproveConfirmBody } from './Body/ApproveConfirmBody';
import { Hash } from 'viem';

type ApproveConfirmModal = {
    saleID: string
    tokenPrice: string
    tokenAmount: number
    onSuccess?: (hash: Hash) => void
}

export function ApproveConfirmModal({ isOpen, saleID, tokenPrice, tokenAmount, onSuccess, onClose }: ModalProps & ApproveConfirmModal) {
    const handleApproveConfirmSuccess = useCallback((hash: Hash) => {
        onClose?.();
        onSuccess?.(hash);
    }, [onSuccess, onClose]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Follow these steps' />

            <ModalBody>
                <ApproveConfirmBody
                    saleID={saleID}
                    tokenPrice={tokenPrice}
                    tokenAmount={tokenAmount}
                    onClose={onClose}
                    onSuccess={handleApproveConfirmSuccess}
                />
            </ModalBody>
        </Modal>
    );
}