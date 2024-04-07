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
import { useTranslation } from '@/localization';
import { useCurrency } from '@/hooks/useCurrency';
import { useNFTRefetch } from '@/states/nft/hooks/useNFTFetch';
import { useBuyActions, useBuyState } from '@/states/buy/hooks';
import { initialBuyStoreState } from '@/states/buy/store';

type BuyButtonProps = {
    contractAddress: `0x${string}`
    tokenID: string,
    saleID: string,
    stock: number,
    price: string,
    currency: string,
    buttonIcon?: ButtonProps<'button'>['iconSlot'],
    buttonView?: ButtonProps<'button'>['view']
}

export function BuyButton({ contractAddress, tokenID, saleID, price, currency, stock, buttonIcon, buttonView }: BuyButtonProps) {
    const { t } = useTranslation();
    const { refetchNFT } = useNFTRefetch(contractAddress, tokenID);
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
                title: t('Approve'),
                description: t('This transaction is conducted only once per asset type')
            },
            confirm: {
                title: t('Purchase'),
                description: t('Send transaction to purchase asset')
            }
        };
    }, [t]);

    const buyCurrency = useCurrency(currency);
    const { approve, checkApproved } = useTokenApprove({
        spender: CONTRACTS.market[activeChainId],
        amountToApprove: totalPrice,
        tokenAddress: buyCurrency.address,
        tokenDecimals: buyCurrency.decimals
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
                text: t('Purchase is successfully initiated. Updates will appear as soon as the transaction is confirmed.'),
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
        const initialAmount = stock === 1 ? '1' : '';

        handleReplaceBuyState({
            ...initialBuyStoreState,
            typedAmount: initialAmount
        });
        buyModal.open();
    }, [buyModal.open, stock, handleReplaceBuyState]);

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
                {t('Buy now')}
            </ActionButton>

            <BuyModal
                isOpen={buyModal.isOpen}
                saleID={saleID}
                price={price}
                currency={currency}
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