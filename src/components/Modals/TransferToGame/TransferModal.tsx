import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { TransferForm } from './Form/TransferForm';

type TransferModalProps = {
    editionsAvailable: number,
    amount: string,
    onAmountChange: (amount: string) => void,
    onConfirm: () => void
} & ModalProps;

// TODO: Translate
export function TransferModal({ isOpen, editionsAvailable, amount, onAmountChange, onConfirm, onClose }: TransferModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Deposit NFT to NFTGTA' />

            <ModalBody>
                <TransferForm
                    amount={amount}
                    onAmountChange={onAmountChange}
                    editionsAvailable={editionsAvailable}
                    onConfirm={onConfirm}
                />
            </ModalBody>
        </Modal>
    );
}