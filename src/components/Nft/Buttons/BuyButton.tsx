import { useCallback, useEffect, useMemo } from 'react';
import { ButtonProps } from '@/uikit';
import { useOpenedState } from '@/hooks/useOpenedState';
import { ActionButton } from './ActionButton';
import { ApproveConfirmModal, BuyModal } from '@/components/Modals';
import { usePendingTransactionModal } from '@/states/global/hooks';
import { useContractCall, useMarketContract } from '@/hooks/useContract';
import { useTokenApprove } from '@/hooks/useTokenApprove';
import { LoadingStatus, useApproveConfirmCallbacks } from '@/hooks/useApproveConfirmCallbacks';
import { CONTRACTS } from '@/config/constants/contracts';
import { activeChainId } from '@/config/chain';
import { useNFTRefetch } from '@/states/nft/hooks/useNFTFetch';
import { useBuyActions, useBuyState } from '@/states/buy/hooks';
import { initialBuyStoreState } from '@/states/buy/store';

type BuyButtonProps = {
    nftID: string,
    saleID: string,
    price: string,
    stock: number,
    buttonIcon?: ButtonProps<'button'>['iconSlot'],
    buttonView?: ButtonProps<'button'>['view']
}

export function BuyButton({ nftID, saleID, price, stock, buttonIcon, buttonView }: BuyButtonProps) {
    const { refetchNFT } = useNFTRefetch(nftID);
    const { callContract } = useContractCall();
    const marketContract = useMarketContract();
    const { typedAmount, totalPrice } = useBuyState();
    const { handleReplaceBuyState } = useBuyActions();
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

    const { approve, checkApproved } = useTokenApprove({
        spender: CONTRACTS.market[activeChainId],
        amountToApprove: totalPrice,
        tokenAddress: CONTRACTS.usdt[activeChainId].address,
        tokenDecimals: CONTRACTS.usdt[activeChainId].decimals
    });

    const { state, handleApprove, handleConfirm, handleApproveConfirmReset } = useApproveConfirmCallbacks({
        onApprove: () => {
            return approve();
        },
        onCheckApproved: () => {
            return checkApproved();
        },
        onConfirm: async () => {
            if (!marketContract || !typedAmount) {
                throw new Error('Confirm was called unnecessary!');
            }

            const sendRes = await callContract({
                contract: marketContract,
                method: 'buyDirectSale',
                args: [
                    BigInt(saleID),
                    BigInt(typedAmount)
                ]
            });

            return sendRes;
        },
        onConfirmSent: (hash) => {
            approveConfirmModal.close();
            pendingTransactionModal.open({
                hash,
                text: 'Purchase is successfully initiated. Updates will appear as soon as the transaction is confirmed.',
                onConfirm: refetchNFT
            });
        }
    });

    // When price changed we should reset approveConfirm (new price -> new approve)
    useEffect(() => {
        if (state.approveState.status !== LoadingStatus.IDLE || state.confirmState.status !== LoadingStatus.IDLE) {
            handleApproveConfirmReset();
        }
    }, [totalPrice]);

    const handleOpenBuyModal = useCallback(() => {
        handleReplaceBuyState(initialBuyStoreState);
        buyModal.open();
    }, [buyModal.open, handleReplaceBuyState]);

    const handlePurchase = useCallback(() => {
        buyModal.close();
        approveConfirmModal.open();
    }, [buyModal.close, approveConfirmModal.open]);

    return (
        <>
            <ActionButton
                view={buttonView}
                iconSlot={buttonIcon}
                onClick={handleOpenBuyModal}
            >
                Buy now
            </ActionButton>

            <BuyModal
                isOpen={buyModal.isOpen}
                tokenPrice={price}
                availableAmount={stock}
                onClose={buyModal.close}
                onPurchase={handlePurchase}
            />

            <ApproveConfirmModal
                isOpen={approveConfirmModal.isOpen}
                state={state}
                texts={texts}
                onApprove={handleApprove}
                onConfirm={handleConfirm}
                onClose={approveConfirmModal.close}
            />
        </>
    );
}