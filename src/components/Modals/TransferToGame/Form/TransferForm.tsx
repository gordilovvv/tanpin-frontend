import { useMemo } from 'react';
import { Button, Input } from '@/uikit';
import { NFTActionText } from '@/components/Nft';
import { useTokenMetadata } from '@/states/nft/hooks/useTokenMetadata';
import { tryToParseAmount } from '@/utils/tryToParseAmount';
import styles from './TransferForm.module.scss';

type TransferFormProps = {
    editionsAvailable: number,
    amount: string,
    onAmountChange: (amount: string) => void
    onConfirm: () => void
}

// TODO: Рефактор
// 1. Использовать стор
// 2. Использовать хук
export function TransferForm({ editionsAvailable, amount, onAmountChange, onConfirm }: TransferFormProps) {
    const tokenMetadata = useTokenMetadata();

    const parsedAmount = useMemo(() => {
        return tryToParseAmount(amount);
    }, [amount]);

    let amountError: string | undefined;

    if (!parsedAmount) {
        amountError = 'Enter amount';
    }

    if (parsedAmount && parsedAmount.isLessThanOrEqualTo(0)) {
        amountError = 'Enter amount';
    }

    if (parsedAmount && parsedAmount.isGreaterThan(editionsAvailable)) {
        amountError = `Available for sale are ${editionsAvailable} copies`;
    }

    if (parsedAmount && !parsedAmount.isInteger()) {
        amountError = 'Enter whole number';
    }

    const amountInputError = parsedAmount && !!amountError;

    const hasError = !!amountError || false;
    const buttonText = amountError || 'Confirm';

    const handleConfirm = () => {
        if (hasError) {
            return;
        }

        onConfirm();
    };

    return (
        <div className={styles.form}>
            {tokenMetadata && <NFTActionText
                text='You’re going to transfer'
                nftName={tokenMetadata.name}
                collectionID={tokenMetadata.collection.ID}
                collectionName={tokenMetadata.collection.name}
                gameID={tokenMetadata.collection.game.ID}
            />}

            <Input
                numerical
                value={amount}
                onInput={onAmountChange}
                placeholder='Enter amount'
                rightAddon={`/ ${editionsAvailable}`}
                danger={amountInputError}
                style={{ paddingRight: '120px' }}
            />

            <Button
                disabled={hasError}
                onClick={handleConfirm}
            >
                {buttonText}
            </Button>
        </div>
    );
}