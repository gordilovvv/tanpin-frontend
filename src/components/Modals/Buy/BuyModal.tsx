import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { BuyForm } from './Form/BuyForm';

type BuyModalProps = {
    tokenPrice: string,
    availableAmount: number,
    onPurchase: () => void
} & ModalProps;

export function BuyModal({ isOpen, tokenPrice, availableAmount, onPurchase, onClose }: BuyModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Buy NFT' />

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