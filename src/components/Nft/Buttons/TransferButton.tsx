import { ActionButton } from './ActionButton';
import { useState } from 'react';
import { useContractCall, useERC1155 } from '@/hooks/useContract';
import { usePendingTransactionModal } from '@/states/global/hooks';
import { CONTRACTS } from '@/config/constants/contracts';
import { activeChainId } from '@/config/chain';
import { useNFTRefetch } from '@/states/nft/hooks/useNFTFetch';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';
import { logError } from '@/utils/sentry';
import { useAccount } from '@/states/user/hooks/useAccount';
import { NFTGTAAddress } from '@/config/constants/nftgta';
import { useOpenedState } from '@/hooks/useOpenedState';
import { ErrorMessageModal, LoadingModal } from '@/components/Modals';
import { TransferModal } from '@/components/Modals/TransferToGame/TransferModal';
import { useTranslation } from '@/localization';

type TransferButtonProps = {
    nftID: string,
    tokenID: string,
    editionsAvailable: number
}

export function TransferButton({ nftID, tokenID, editionsAvailable }: TransferButtonProps) {
    const { t } = useTranslation();
    const { refetchNFT } = useNFTRefetch(nftID);
    const { callContract } = useContractCall();
    const { address } = useAccount();
    const erc1155Contract = useERC1155(CONTRACTS.ERC1155[activeChainId]);
    const transferModal = useOpenedState();
    const pendingTransactionModal = usePendingTransactionModal();
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [transactionError, setTransactionError] = useState<string | undefined>();

    const handleTransfer = async () => {
        try {
            if (!erc1155Contract || !address) {
                throw new Error('Transfer is not ready!');
            }

            setIsLoading(true);
            transferModal.close();

            if (BigInt(amount) <= 0n) {
                throw new Error('Transfer amount should be greater than 0!');
            }

            const { hash } = await callContract({
                contract: erc1155Contract,
                method: 'safeTransferFrom',
                args: [address, NFTGTAAddress, BigInt(tokenID), BigInt(amount), '0x']
            });

            pendingTransactionModal.open({
                hash,
                text: 'NFT is successfully transfered to the NFTGTA. Updates will appear as soon as transaction is confirmed.',
                onConfirm: refetchNFT
            });
        } catch (error) {
            logError(error);
            setTransactionError(walletErrorToUserReadableMessage(error, t));
        } finally {
            setIsLoading(false);
        }
    };

    const handleTransferModalOpen = () => {
        setAmount('');
        transferModal.open();
    };

    return (
        <>
            <ActionButton
                view='nftgta'
                onClick={handleTransferModalOpen}
            >
                Transfer to game
            </ActionButton>

            <TransferModal
                isOpen={transferModal.isOpen}
                amount={amount}
                onAmountChange={setAmount}
                editionsAvailable={editionsAvailable}
                onConfirm={handleTransfer}
                onClose={transferModal.close}
            />

            <LoadingModal
                isOpen={isLoading}
                text={'Please confirm the transaction in your wallet to transfer the NFT.'}
            />

            <ErrorMessageModal
                isOpen={!!transactionError}
                error={transactionError}
                onClose={() => setTransactionError(undefined)}
            />
        </>
    );
}