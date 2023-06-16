import { useCallback } from 'react';
import { Cart } from '@/uikit';
import { ApproveConfirmModal } from '@/components/Modals';
import { ActionBox } from '../Box/ActionBox';
import { ActionTitle } from '../Title/ActionTitle';
import { ActionButton } from '../Button/ActionButton';
import { USDPrice } from '../USDPrice/USDPrice';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { useOpenedState } from '@/hooks/useOpenedState';
import { usePendingTransactionModal } from '@/states/global/hooks';
import { Hash } from 'viem';
import { NFTInStore } from '@/states/nft/types';
import styles from './DirectSale.module.scss';

type DirectSaleProps = {
    nft: NFTInStore
}

export function DirectSale({ nft }: DirectSaleProps) {
    const approveConfirmModal = useOpenedState();
    const pendingTransactionModal = usePendingTransactionModal();

    const handlePurchase = () => {
        approveConfirmModal.open();
    };

    const handleSuccess = useCallback((hash: Hash) => {
        pendingTransactionModal.open(hash, 'Purchase is successfully initiated. Updates will appear as soon as the transaction is confirmed.');
    }, [pendingTransactionModal.open]);

    return (
        <>
            <ActionBox>
                <div className={styles.top}>
                    <ActionTitle>
                        {formatTokenAmount(nft.price!.amount)} {nft.price!.currency}
                    </ActionTitle>

                    <USDPrice
                        tokenAmount={nft.price!.amount}
                        tokenSymbol={nft.price!.currency}
                    />
                </div>

                <ActionButton
                    iconSlot={<Cart />}
                    onClick={handlePurchase}
                >
                    Buy now
                </ActionButton>
            </ActionBox>

            <ApproveConfirmModal
                isOpen={approveConfirmModal.isOpen}
                tokenID={nft.tokenID}
                tokenPrice={nft.price!.amount}
                tokenAmount={1} // TODO: модалка ввода количества ERC-1155
                onSuccess={handleSuccess}
                onClose={approveConfirmModal.close}
            />
        </>
    );
}