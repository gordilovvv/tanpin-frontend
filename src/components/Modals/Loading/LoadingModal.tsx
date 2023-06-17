import { Button, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { LoadingContent } from './LoadingContent';
import styles from './LoadingModal.module.scss';

type LoadingModalProps = {
    text?: string
    onCancel?: () => void
}

export function LoadingModal({ isOpen, text, onCancel }: LoadingModalProps & ModalProps) {
    const title = <span className={styles.title}>Loading</span>;

    return (
        <Modal isOpen={isOpen}>
            <ModalHead title={title} />

            <ModalBody className={styles.body}>
                <LoadingContent text={text} />

                {onCancel && <div className={styles.bottom}>
                    <Button
                        view='secondary'
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>}
            </ModalBody>
        </Modal>
    );
}