
import { Button, Modal, ModalBody, ModalHead, Input } from '@/uikit';



type NFTUpdateSaleModalProps = {
    isOpen: boolean,
    onClose: () => void,
}

export function NFTUpdateSaleModal({ isOpen, onClose, }: NFTUpdateSaleModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Change Price' />

            <ModalBody>
                <div >
                    <div >Update the price for your listed NFT</div>
                    <Input placeholder="Enter price" />
                    <div>Commission Tanpin: x usdt</div>
                    <div>Profit after sale: x usdt</div>

                    <Button>
                        Update Price
                    </Button >
                </div>
            </ModalBody>
        </Modal>
    );
}