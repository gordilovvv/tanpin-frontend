import { useCallback, useMemo, useState } from 'react';
import { ButtonProps } from '@/uikit';
import { useOpenedState } from '@/hooks/useOpenedState';
import { ActionButton } from './ActionButton';
import { ApproveConfirmModal, BuyModal } from '@/components/Modals';
import { usePendingTransactionModal } from '@/states/global/hooks';
import { useContractCall, useMarketContract } from '@/hooks/useContract';
import { useTokenApprove } from '@/hooks/useTokenApprove';
import { useApproveConfirmCallbacks } from '@/hooks/useApproveConfirmCallbacks';
import { CONTRACTS } from '@/config/constants/contracts';
import { activeChainId } from '@/config/chain';
import { useNFTFetch } from '@/states/nft/hooks/useNFTFetch';

type BuyButtonProps = {
    nftID: string,
    saleID: string,
    price: string,
    stock: number,
    buttonIcon?: ButtonProps<'button'>['iconSlot'],
    buttonView?: ButtonProps<'button'>['view']
}

// TODO:
// 1. РЕФАКТОР, ТАК КАК НЕТ КОЛИЧЕСТВА + ПРОВЕРКА АПРУВА ВЫЗЫВАЕТСЯ РАНЬШЕ ВРЕМЕНИ
// 2. А ТАКЖЕ ТРАНЗЫ ПО 2 РАЗА ВЫЗЫАВАЮТСЯ
// 3. НУЖНО ЛИ ПОЛЕ ДЛЯ УНИКАЛЬНЕХ ТОКЕНОВ ???
export function BuyButton({ nftID, saleID, price, stock, buttonIcon, buttonView }: BuyButtonProps) {
    const { refetchNFT } = useNFTFetch(nftID);
    const { callContract } = useContractCall();
    const marketContract = useMarketContract();
    const [amount, setAmount] = useState('');
    const buyModal = useOpenedState();
    const approveConfirmModal = useOpenedState();
    const pendingTransactionModal = usePendingTransactionModal();

    const texts = useMemo(() => {
        return {
            approve: {
                title: 'Approve',
                description: 'This transaction is conducted only once per asset type'
            },
            confirm: {
                title: 'Purchase',
                description: 'Send transaction to purchase asset'
            }
        };
    }, []);

    const { approve, isApproved, isPreparing } = useTokenApprove({
        spender: CONTRACTS.market[activeChainId],
        amountToApprove: price,
        tokenAddress: CONTRACTS.usdt[activeChainId].address,
        tokenDecimals: CONTRACTS.usdt[activeChainId].decimals
    });

    const { state, handleApprove, handleConfirm } = useApproveConfirmCallbacks({
        isApproved,
        onApprove: () => {
            return approve();
        },
        onConfirm: async () => {
            if (!marketContract || !amount) {
                throw new Error('Confirm was called unnecessary!');
            }

            const sendRes = await callContract({
                contract: marketContract,
                method: 'buyDirectSale',
                args: [
                    BigInt(saleID),
                    BigInt(amount)
                ]
            });

            return sendRes;
        },
        onConfirmSent: (hash) => {
            approveConfirmModal.close();
            pendingTransactionModal.open({
                hash,
                text: 'Purchase is successfully initiated. Updates will appear as soon as the transaction is confirmed.',
                onReceipt: refetchNFT
            });
        }
    });

    const handlePurchase = useCallback(() => {
        buyModal.close();
        approveConfirmModal.open();
    }, [buyModal.close, approveConfirmModal.open]);

    return (
        <>
            <ActionButton
                view={buttonView}
                iconSlot={buttonIcon}
                onClick={buyModal.open}
            >
                Buy now
            </ActionButton>

            <BuyModal
                isOpen={buyModal.isOpen}
                amount={amount}
                availableAmount={stock}
                onAmountChange={setAmount}
                onClose={buyModal.close}
                onPurchase={handlePurchase}
            />

            <ApproveConfirmModal
                isOpen={approveConfirmModal.isOpen}
                state={state}
                texts={texts}
                isLoading={isPreparing}
                onApprove={handleApprove}
                onConfirm={handleConfirm}
                onClose={approveConfirmModal.close}
            />
        </>
    );
}