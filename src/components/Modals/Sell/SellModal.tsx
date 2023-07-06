import { useState } from 'react';
import { Modal, ModalBody, ModalHead, ModalProps, ToggleButton, ToggleGroup } from '@/uikit';
import { NFTActionText } from '@/components/Nft';
import { CreateDirectSale } from './DirectSale/CreateDirectSale';
import { CreateAuction } from './Auction/CreateAuction';
import { useTokenMetadata } from '@/states/nft/hooks/useTokenMetadata';
import styles from './SellModal.module.scss';

enum ViewStage {
    SALE = 'sale',
    AUCTION = 'auction'
}

type SellModalProps = {
    availableEditions?: number,
    onConfirm: () => void
} & ModalProps;

export function SellModal({ isOpen, availableEditions, onClose, onConfirm }: SellModalProps) {
    const metadata = useTokenMetadata();
    const [stage, setStage] = useState<ViewStage>(ViewStage.SALE);

    const renderStage = () => {
        if (stage === ViewStage.SALE) {
            return (<CreateDirectSale
                editionsAvailable={availableEditions}
                onConfirm={onConfirm}
            />);
        }

        // TODO: ДОБАВИТЬ АУКЦИОН
        if (stage === ViewStage.AUCTION) {
            return (<CreateAuction />);
        }

        return null;
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='List NFT' />

            <ModalBody>
                <div className={styles.body}>
                    {metadata && <NFTActionText
                        text='You are going to list'
                        nftName={metadata.name}
                        collectionID={metadata.collection.ID}
                        collectionName={metadata.collection.name}
                        gameID={metadata.collection.game.ID}
                    />}

                    <ToggleGroup>
                        <ToggleButton
                            active={stage === ViewStage.SALE}
                            onClick={() => setStage(ViewStage.SALE)}
                        >
                            Sale
                        </ToggleButton>

                        <ToggleButton
                            active={stage === ViewStage.AUCTION}
                            onClick={() => setStage(ViewStage.AUCTION)}
                        >
                            Auction
                        </ToggleButton>
                    </ToggleGroup>

                    {renderStage()}
                </div>
            </ModalBody>
        </Modal>
    );
}