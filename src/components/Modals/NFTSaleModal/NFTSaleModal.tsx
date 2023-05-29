
import { Button, Modal, ModalBody, ModalHead, Input } from '@/uikit';



type NFTSaleModalProps = {
    isOpen: boolean,
    onClose: () => void,
}

export function NFTSaleModal({ isOpen, onClose, }: NFTSaleModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='List for Sale' />

            <ModalBody>
                <div>
                    <div >Set a price for listing your NFT</div>
                    <Input placeholder="Enter price" />
                    <div>Commission Tanpin: x usdt</div>
                    <div>Profit after sale: x usdt</div>

                    <Button>
                        List for Sale
                    </Button >
                </div>
            </ModalBody>
        </Modal>
    );
}