import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { ApproveConfirmBody } from './Body/ApproveConfirmBody';
import { ApproveConfirmState } from '@/hooks/useApproveConfirmCallbacks';

type ApproveConfirmModal = {
    state: ApproveConfirmState,
    texts: {
        approve: { title: string, description: string },
        confirm: { title: string, description: string }
    },
    isLoading?: boolean,
    onApprove: () => Promise<void>,
    onConfirm: () => Promise<void>
} & ModalProps;

export function ApproveConfirmModal({ isOpen, state, isLoading, texts, onApprove, onConfirm, onClose }: ApproveConfirmModal) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Follow these steps' />

            <ModalBody>
                <ApproveConfirmBody
                    state={state}
                    texts={texts}
                    isLoading={isLoading}
                    onApprove={onApprove}
                    onConfirm={onConfirm}
                    onClose={onClose}
                />
            </ModalBody>
        </Modal>
    );
}