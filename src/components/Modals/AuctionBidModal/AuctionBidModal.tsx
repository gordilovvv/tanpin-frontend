import styles from './AuctionBidModal.module.scss';
import { Button, Modal, ModalBody, ModalHead, Input } from '@/uikit';



type AuctionBidModalProps = {
    isOpen: boolean,
    onClose: () => void,
}

export function AuctionBidModal({ isOpen, onClose, }: AuctionBidModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Place a Bid' />

            <ModalBody>
                <div className={styles.wrapper}>
                    <div >Enter your bid amount</div>
                    <Input placeholder="Enter bid" />

                    <Button>
                        Place a bid
                    </Button >
                </div>
            </ModalBody>
        </Modal>
    );
}