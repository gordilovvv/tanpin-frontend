import { useCallback, useEffect } from 'react';
import { Button, Input, UnstyleButton } from '@/uikit';
import { LoadingContent } from '../../Loading/LoadingContent';
import { InsufficientFunds } from '@/components/Funds';
import { useTranslation } from '@/localization';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { useTransferStore } from '@/states/transfer/store';
import { useERC20TokenTransfer } from '@/states/transfer/hooks/useTransfer';
import { useERC20TokenTransferError } from '@/states/transfer/hooks/useTransferError';
import { CONTRACTS } from '@/config/constants/contracts';
import { activeChainId } from '@/config/chain';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './TransferForm.module.scss';

type TransferFormProps = {
    onResult?: () => void
}

export function TransferForm({ onResult }: TransferFormProps) {
    const { t } = useTranslation();
    const [typedAddress, typedAmount, typeAddress, typeAmount, replaceState] = useTransferStore(state => [
        state.typedAddress,
        state.typedAmount,
        state.typeAddress,
        state.typeAmount,
        state.replaceState
    ]);

    const tanpinBalance = useTokenBalance(
        CONTRACTS.tanpin[activeChainId].address,
        CONTRACTS.tanpin[activeChainId].decimals
    );

    const { parsedAmount, parsedAddress, amountError, addressError, isZeroBalance } = useERC20TokenTransferError(
        tanpinBalance.amount,
        typedAmount,
        typedAddress
    );

    const { handleTransfer, isLoading: isLoadingTransfer } = useERC20TokenTransfer(
        CONTRACTS.tanpin[activeChainId].address,
        CONTRACTS.tanpin[activeChainId].decimals,
        parsedAddress,
        parsedAmount,
        onResult
    );

    const handleAll = useCallback(() => {
        if (tanpinBalance.amount) {
            typeAmount(formatTokenAmount(tanpinBalance.amount));
        }
    }, [typeAmount, tanpinBalance.amount]);

    useEffect(() => {
        return () => {
            replaceState({
                typedAmount: '',
                typedAddress: ''
            });
        };
    }, []);

    if (tanpinBalance.isLoading) {
        return (<LoadingContent />);
    }

    return (
        <div className={styles.form}>
            <div className={styles.head}>
                <div className={styles.label}>
                    {t('Balance')}:
                </div>

                {tanpinBalance.amount && <div className={styles.balance}>
                    <span>{formatTokenAmount(tanpinBalance.amount)}</span> TANPIN
                </div>}
            </div>

            <div className={styles.body}>
                <Input
                    numerical
                    value={typedAmount}
                    onInput={typeAmount}
                    style={{ paddingRight: '120px' }}
                    placeholder={t('Amount')}
                    danger={parsedAmount !== undefined && !!amountError}
                    rightAddon={!isZeroBalance && <UnstyleButton
                        className={styles.allButton}
                        onClick={handleAll}
                    >
                        {t('All_funds')}
                    </UnstyleButton>}
                />

                <Input
                    value={typedAddress}
                    placeholder={t('Wallet address')}
                    onInput={typeAddress}
                    danger={typedAddress.length !== 0 && !!addressError}
                />
            </div>

            <div className={styles.action}>
                {isZeroBalance
                    ? <InsufficientFunds text={t('Insufficient funds in %currency%', { currency: 'TANPIN' })} />
                    : <Button
                        loading={isLoadingTransfer}
                        disabled={!!addressError || !!amountError}
                        onClick={handleTransfer}
                    >
                        {amountError || addressError || t('Send')}
                    </Button>}
            </div>
        </div>
    );
}