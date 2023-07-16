import { useMemo } from 'react';
import { ApproveConfirmModal, SellModal } from '@/components/Modals';
import { ActionButton } from '../Button/ActionButton';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useNFTFetch } from '@/states/nft/hooks/useNFTFetch';
import { useSaleState } from '@/states/sale/hooks';
import { useOpenedState } from '@/hooks/useOpenedState';
import { useApproveConfirmCallbacks } from '@/hooks/useApproveConfirmCallbacks';
import { usePendingTransactionModal } from '@/states/global/hooks';
import { useContractCall, useERC1155, useMarketContract } from '@/hooks/useContract';
import { CONTRACTS } from '@/config/constants/contracts';
import { logError } from '@/utils/sentry';
import { activeChainId } from '@/config/chain';
import { formatValueToRaw } from '@/utils/formatRawAmount';

type ListButtonProps = {
    nftID: string,
    tokenID: string,
    availableEditions?: number
}

// TODO:
// 1. ДОБАВИТЬ АУКЦИОН
export function ListButton({ nftID, tokenID, availableEditions }: ListButtonProps) {
    const { address } = useAccount();
    const { refetchNFT } = useNFTFetch(nftID);
    const { callContract } = useContractCall();
    const { amount, price } = useSaleState();
    const saleModal = useOpenedState();
    const approveConfirmModal = useOpenedState();
    const pendingTransactionModal = usePendingTransactionModal();
    const nftContract = useERC1155(CONTRACTS.ERC1155[activeChainId]);
    const marketContract = useMarketContract();

    const texts = useMemo(() => {
        return {
            approve: {
                title: 'Approve',
                description: 'This transaction is sent only once per asset'
            },
            confirm: {
                title: 'List token',
                description: 'Send transaction to list asset'
            }
        };
    }, []);

    const { state, handleApprove, handleConfirm } = useApproveConfirmCallbacks({
        onCheckApproved: async () => {
            try {
                if (!nftContract || !address) {
                    throw new Error('onCheckApproved called unnecessary!');
                }

                const approvedForContract = await nftContract.read.isApprovedForAll([
                    address,
                    CONTRACTS.market[activeChainId]
                ]);

                return approvedForContract;
            } catch (error) {
                logError(error);

                return false;
            }
        },
        onApprove: async () => {
            if (!nftContract) {
                throw new Error('if called unnecessary!');
            }

            const sendRes = await callContract({
                contract: nftContract,
                method: 'setApprovalForAll',
                args: [CONTRACTS.market[activeChainId], true]
            });

            return sendRes;
        },
        onConfirm: async () => {
            if (!marketContract) {
                throw new Error('Market contract have not loaded!');
            }

            const rawPrice = formatValueToRaw(
                price,
                CONTRACTS.usdt[activeChainId].decimals
            );

            const sendRes = await callContract({
                contract: marketContract,
                method: 'createDirectSale',
                args: [
                    CONTRACTS.ERC1155[activeChainId],
                    BigInt(tokenID),
                    BigInt(amount),
                    CONTRACTS.usdt[activeChainId].address,
                    rawPrice
                ]
            });

            return sendRes;
        },
        onConfirmSent: (hash) => {
            approveConfirmModal.close();
            pendingTransactionModal.open({
                hash,
                text: 'Listing is successfully initiated. Updates will appear as soon as the transaction is confirmed.',
                onReceipt: refetchNFT
            });
        }
    });

    return (
        <>
            <ActionButton onClick={saleModal.open}>
                List for Sale
            </ActionButton>

            <SellModal
                isOpen={saleModal.isOpen}
                availableEditions={availableEditions}
                onClose={saleModal.close}
                onConfirm={approveConfirmModal.open}
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