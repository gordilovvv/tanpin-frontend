import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { UpdateSaleBody } from './Body/UpdateSaleBody';
import { useTranslation } from '@/localization';

type UpdateSaleModalProps = {
    currentPrice: string,
    currency: string,
    onConfirm: () => void
} & ModalProps;

export function UpdateSaleModal({ isOpen, currentPrice, currency, onClose, onConfirm }: UpdateSaleModalProps) {
    const { t } = useTranslation();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title={t('Change price')} />

            <ModalBody>
                <UpdateSaleBody
                    currentPrice={currentPrice}
                    currency={currency}
                    onConfirm={onConfirm}
                    onClose={onClose}
                />
            </ModalBody>
        </Modal>
    );
}