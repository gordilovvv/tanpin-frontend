import { Button, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { CopyButton } from './CopyButton/CopyButton';
import styles from './ShareModal.module.scss';
import { TwitterShare, TelegramShare, VkShare } from './Socials';

type ShareModalProps = {
    //todo
}

export function ShareModal({ isOpen, onClose }: ShareModalProps & ModalProps) {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Share' />

            <ModalBody className={styles.wrap}>

                <TwitterShare url="http://example.com" />
                <TelegramShare url="http://example.com" />
                <VkShare url="http://example.com" />
                <CopyButton url="http://example.com" />

                <Button
                    onClick={onClose}
                >
                    Close
                </Button>
            </ModalBody>
        </Modal>
    );
}