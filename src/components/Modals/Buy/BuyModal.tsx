import { Button, InputWithAddon, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { useTokenMetadata } from '@/states/nft/hooks/useTokenMetadata';
import { NFTActionText } from '@/components/Nft';
import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import styles from './BuyModal.module.scss';

type BuyModalProps = {
    amount?: string,
    availableAmount?: number,
    onAmountChange?: (amount: string) => void,
    onPurchase: () => void
} & ModalProps;

export function BuyModal({ isOpen, amount, availableAmount, onAmountChange, onPurchase, onClose }: BuyModalProps) {
    const metadata = useTokenMetadata();
    const canInputAmount = amount !== undefined && availableAmount && onAmountChange;

    const parsedAmount = useMemo(() => {
        return amount ? new BigNumber(amount) : undefined;
    }, [amount]);

    let amountError: string | undefined;

    if (canInputAmount) {
        if (!parsedAmount) {
            amountError = 'Enter amount';
        }

        if (parsedAmount && parsedAmount.isLessThanOrEqualTo(0)) {
            amountError = 'Enter amount';
        }

        if (parsedAmount && parsedAmount.isGreaterThan(availableAmount)) {
            amountError = `Available for sale are ${availableAmount} copies`;
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Buy NFT' />

            <ModalBody>
                <div className={styles.body}>
                    {metadata && <NFTActionText
                        text='You are going to buy'
                        nftName={metadata.name}
                        collectionID={metadata.collection.ID}
                        collectionName={metadata.collection.name}
                        gameID={metadata.collection.game.ID}
                    />}

                    {canInputAmount && <InputWithAddon
                        numerical
                        value={amount}
                        onInput={onAmountChange}
                        style={{ paddingRight: '120px' }}
                        error={parsedAmount && !!amountError}
                        addonText={`/ ${availableAmount}`}
                    />}

                    <Button
                        disabled={!!amountError}
                        onClick={onPurchase}
                    >
                        {amountError || 'Proceed to payment'}
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
}