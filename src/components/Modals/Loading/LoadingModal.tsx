import { Button, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { LoadingContent } from './LoadingContent';
import { useTranslation } from '@/localization';
import styles from './LoadingModal.module.scss';

type LoadingModalProps = {
    text?: string
    onCancel?: () => void
}

export function LoadingModal({ isOpen, text, onCancel }: LoadingModalProps & ModalProps) {
    const { t } = useTranslation();
    const title = <span className={styles.title}>{t('Loading')}</span>;

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
                        {t('Cancel')}
                    </Button>
                </div>}
            </ModalBody>
        </Modal>
    );
}