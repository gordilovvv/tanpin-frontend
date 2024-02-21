import { Button, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { Hash } from 'viem';
import { useTranslation } from '@/localization';
import { getTransactionExplorerURL } from '@/utils/explorer';
import styles from './TransferSuccessModal.module.scss';

type TransferSuccessModalProps = {
    amount?: string,
    hash?: Hash
} & ModalProps;

export function TransferSuccessModal({ isOpen, amount, hash, onClose }: TransferSuccessModalProps) {
    const { t } = useTranslation();

    return (
        <Modal
            isOpen={isOpen}
        >
            <ModalHead
                title={
                    <div className={styles.title}>
                        {t('You’ve successfully sent')}<br /> <span>{amount} TANPIN</span>
                    </div>
                }
            />

            <ModalBody>
                <div className={styles.buttons}>
                    <Button onClick={onClose}>
                        {t('Close')}
                    </Button>

                    {hash && <Button
                        as='a'
                        view='secondary'
                        href={getTransactionExplorerURL(hash)}
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        PolygonScan
                    </Button>}
                </div>
            </ModalBody>
        </Modal>
    );
}