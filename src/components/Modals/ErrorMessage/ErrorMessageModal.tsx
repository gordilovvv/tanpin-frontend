import { Button, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import styles from './ErrorMessageModal.module.scss';

type ErrorMessageModalProps = {
    error: string | undefined
}

export function ErrorMessageModal({ isOpen, error, onClose }: ErrorMessageModalProps & ModalProps) {
    return (
        <Modal isOpen={isOpen}>
            <ModalHead title='Error' />

            <ModalBody className={styles.wrap}>
                <div className={styles.text}>
                    {error}
                </div>

                <Button
                    view='secondary'
                    onClick={onClose}
                >
                    Close
                </Button>
            </ModalBody>
        </Modal>
    );
}