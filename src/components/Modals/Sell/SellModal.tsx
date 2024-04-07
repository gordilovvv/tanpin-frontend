import { useState } from 'react';
import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { NFTPreview } from '@/components/Nft';
import { CreateDirectSale } from './DirectSale/CreateDirectSale';
import { CreateAuction } from './Auction/CreateAuction';
import { useTranslation } from '@/localization';
import { useNFT } from '@/states/nft/hooks/useNFT';
import { isUniqueNFT } from '@/utils/nft';
import styles from './SellModal.module.scss';

enum ViewStage {
    SALE = 'sale',
    AUCTION = 'auction'
}

type SellModalProps = {
    availableAmount: number,
    onConfirm: () => void
} & ModalProps;

// TODO: Добавить аукцион
export function SellModal({ isOpen, availableAmount, onClose, onConfirm }: SellModalProps) {
    const { t } = useTranslation();
    const nft = useNFT()!;
    const isUnique = isUniqueNFT(nft);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [stage, setStage] = useState<ViewStage>(ViewStage.SALE);

    const renderStage = () => {
        if (stage === ViewStage.SALE) {
            return (<CreateDirectSale
                availableAmount={availableAmount}
                uniqueNFT={isUnique}
                onConfirm={onConfirm}
            />);
        }

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
            <ModalHead title={t('List NFT')} />

            <ModalBody>
                <div className={styles.body}>
                    <NFTPreview
                        nft={nft}
                        onClick={onClose}
                    />

                    {/* <ToggleGroup>
                        <ToggleButton
                            active={stage === ViewStage.SALE}
                            onClick={() => setStage(ViewStage.SALE)}
                        >
                            {t('Sale')}
                        </ToggleButton>

                        <ToggleButton
                            active={stage === ViewStage.AUCTION}
                            onClick={() => setStage(ViewStage.AUCTION)}
                        >
                            {t('Auction')}
                        </ToggleButton>
                    </ToggleGroup> */}

                    {renderStage()}
                </div>
            </ModalBody>
        </Modal>
    );
}