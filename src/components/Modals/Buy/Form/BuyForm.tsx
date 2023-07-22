import { useEffect } from 'react';
import { Button, Input } from '@/uikit';
import { NFTActionText } from '@/components/Nft';
import { InsufficientFunds } from '@/components/Funds';
import { LoadingContent } from '../../Loading/LoadingContent';
import { useTokenMetadata } from '@/states/nft/hooks/useTokenMetadata';
import { useBuyActions, useBuyDirectSaleInfo, useBuyState } from '@/states/buy/hooks';
import styles from './BuyForm.module.scss';

type BuyFormProps = {
    tokenPrice: string,
    availableAmount: number,
    onPurchase: () => void
}

export function BuyForm({ tokenPrice, availableAmount, onPurchase }: BuyFormProps) {
    const metadata = useTokenMetadata();
    const { typedAmount } = useBuyState();
    const { handleAmountType, handleTotalPrice } = useBuyActions();

    const { parsedAmount, totalPrice, isLoading, amountError, balanceError } = useBuyDirectSaleInfo(
        tokenPrice,
        typedAmount,
        availableAmount
    );

    useEffect(() => {
        handleTotalPrice(totalPrice);
    }, [totalPrice]);

    if (isLoading) {
        return (<LoadingContent />);
    }

    return (
        <div className={styles.form}>
            {metadata && <NFTActionText
                text='You are going to buy'
                nftName={metadata.name}
                collectionID={metadata.collection.ID}
                collectionName={metadata.collection.name}
                gameID={metadata.collection.game.ID}
            />}

            <Input
                numerical
                value={typedAmount}
                onInput={handleAmountType}
                style={{ paddingRight: '120px' }}
                danger={parsedAmount !== undefined && !!amountError}
                rightAddon={`/ ${availableAmount}`}
            />

            {balanceError && <InsufficientFunds text='Insufficient funds in USDT' />}

            <Button
                disabled={!!balanceError || !!amountError}
                onClick={onPurchase}
            >
                {!balanceError && amountError || 'Proceed to payment'}
            </Button>
        </div>
    );
}