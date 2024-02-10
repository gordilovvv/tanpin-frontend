import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { BuyForm } from './Form/BuyForm';
import { useTranslation } from '@/localization';

type BuyModalProps = {
    tokenPrice: string,
    availableAmount: number,
    onPurchase: () => void
} & ModalProps;

export function BuyModal({ isOpen, tokenPrice, availableAmount, onPurchase, onClose }: BuyModalProps) {
    const { t } = useTranslation();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title={t('Buy NFT')} />

            <ModalBody>
                <BuyForm
                    tokenPrice={tokenPrice}
                    availableAmount={availableAmount}
                    onPurchase={onPurchase}
                />
            </ModalBody>
        </Modal>
    );
}