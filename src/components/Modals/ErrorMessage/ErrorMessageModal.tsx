import { Button, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { useTranslation } from '@/localization';
import styles from './ErrorMessageModal.module.scss';

type ErrorMessageModalProps = {
    error: string | undefined
}

export function ErrorMessageModal({ isOpen, error, onClose }: ErrorMessageModalProps & ModalProps) {
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen}>
            <ModalHead title={t('Error')} />

            <ModalBody className={styles.wrap}>
                <div className={styles.text}>
                    {error}
                </div>

                <Button
                    view='secondary'
                    onClick={onClose}
                >
                    {t('Close')}
                </Button>
            </ModalBody>
        </Modal>
    );
}