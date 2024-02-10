import { useCallback, useState } from 'react';
import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { TransactionInfo } from './Info/TransactionInfo';
import { PendingTransaction } from '@/states/global/types';
import { useTranslation } from '@/localization';
import styles from './PendingTransactionModal.module.scss';

type PendingTransactionModalProps = {
    hash?: PendingTransaction['hash']
    text?: PendingTransaction['text'],
    onReject?: PendingTransaction['onReject'],
    onConfirm?: PendingTransaction['onConfirm'],
}

export function PendingTransactionModal({ isOpen, text, hash, onReject, onConfirm, onClose }: PendingTransactionModalProps & ModalProps) {
    const { t } = useTranslation();
    const [canClose, setCanClose] = useState(false);
    const handleClose = canClose ? onClose : undefined;

    const handleReject = useCallback(async () => {
        if (onReject) {
            await onReject();
        }

        setCanClose(true);
    }, [onReject, setCanClose]);

    const handleConfirm = useCallback(async () => {
        if (onConfirm) {
            await onConfirm?.();
        }

        setCanClose(true);
    }, [onConfirm, setCanClose]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            closeOnOverlayClick={canClose}
        >
            <ModalHead title={t('Transaction sent')} />

            <ModalBody>
                <div className={styles.body}>
                    <div className={styles.text}>
                        {text}
                    </div>

                    {hash && <TransactionInfo
                        hash={hash}
                        onClose={handleClose}
                        onReject={handleReject}
                        onConfirm={handleConfirm}
                    />}
                </div>
            </ModalBody>
        </Modal>
    );
}