import { useCallback, useState } from 'react';
import { Hash } from 'viem';
import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { TransactionInfo } from './Info/TransactionInfo';
import styles from './PendingTransactionModal.module.scss';

type PendingTransactionModalProps = {
    hash?: Hash
    text?: string
}

export function PendingTransactionModal({ isOpen, text, hash, onClose }: PendingTransactionModalProps & ModalProps) {
    const [canClose, setCanClose] = useState(false);

    const handleClose = canClose ? onClose : undefined;
    const handleTransactionReceipt = useCallback(() => {
        setCanClose(true);
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
                        onTransactionReceipt={handleTransactionReceipt}
                    />}
                </div>
            </ModalBody>
        </Modal>
    );
}