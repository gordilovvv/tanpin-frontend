import { useCallback, useState } from 'react';
import { Hash, TransactionReceipt } from 'viem';
import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { TransactionInfo } from './Info/TransactionInfo';
import styles from './PendingTransactionModal.module.scss';

type PendingTransactionModalProps = {
    hash?: Hash
    text?: string,
    onReject?: () => void
    onReceipt?: (receipt: TransactionReceipt) => void,
}

export function PendingTransactionModal({ isOpen, text, hash, onReject, onReceipt, onClose }: PendingTransactionModalProps & ModalProps) {
    const [canClose, setCanClose] = useState(false);

    const handleClose = canClose ? onClose : undefined;

    const handleReject = useCallback(() => {
        onReject?.();
    }, []);

    const handleReceipt = useCallback((receipt: TransactionReceipt) => {
        setCanClose(true);
        onReceipt?.(receipt);
    }, [setCanClose]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            closeOnOverlayClick={canClose}
        >
            <ModalHead title='Transaction sent' />

            <ModalBody>
                <div className={styles.body}>
                    <div className={styles.text}>
                        {text}
                    </div>

                    {hash && <TransactionInfo
                        hash={hash}
                        onClose={handleClose}
                        onReject={handleReject}
                        onReceipt={handleReceipt}
                    />}
                </div>
            </ModalBody>
        </Modal>
    );
}