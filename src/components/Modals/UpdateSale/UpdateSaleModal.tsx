import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { UpdateSaleBody } from './Body/UpdateSaleBody';

type UpdateSaleModalProps = {
    currentPrice: string,
    onConfirm: () => void
} & ModalProps;

export function UpdateSaleModal({ isOpen, currentPrice, onClose, onConfirm }: UpdateSaleModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Change price' />

            <ModalBody>
                <UpdateSaleBody
                    currentPrice={currentPrice}
                    onConfirm={onConfirm}
                />
            </ModalBody>
        </Modal>
    );
}