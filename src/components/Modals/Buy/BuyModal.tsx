import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { BuyForm } from './Form/BuyForm';
import { useTranslation } from '@/localization';

type BuyModalProps = {
    saleID: string,
    price: string,
    currency: string,
    availableAmount: number,
    onPurchase: () => void
} & ModalProps;

export function BuyModal({ isOpen, saleID, price, currency, availableAmount, onPurchase, onClose }: BuyModalProps) {
    const { t } = useTranslation();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title={t('Buy NFT')} />

            <ModalBody>
                <BuyForm
                    saleID={saleID}
                    price={price}
                    currency={currency}
                    availableAmount={availableAmount}
                    onPurchase={onPurchase}
                    onClose={onClose}
                />
            </ModalBody>
        </Modal>
    );
}