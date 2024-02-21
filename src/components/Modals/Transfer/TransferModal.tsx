import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { TransferForm } from './Form/TransferForm';
import { useTranslation } from '@/localization';
import tanpinCoin from '@/app/assets/images/tanpin-coin-large.png';
import styles from './TransferModal.module.scss';

export function TransferModal({ isOpen, onClose }: ModalProps) {
    const { t } = useTranslation();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead
                title={<div className={styles.title}>
                    <div className={styles.coin}>
                        <img
                            src={tanpinCoin}
                            alt='TANPIN'
                        />
                    </div>

                    <div className={styles.text}>
                        {t('Transfer')} <span>TANPIN</span>
                    </div>
                </div>}
            />

            <ModalBody>
                <TransferForm onResult={onClose} />
            </ModalBody>
        </Modal>
    );
}