import { ActionButton } from './ActionButton';
import { UpdateSaleModal } from '@/components/Modals';
import { useOpenedState } from '@/hooks/useOpenedState';
import { useNFTFetch } from '@/states/nft/hooks/useNFTFetch';

type UpdateSaleButtonProps = {
    nftID: string,
    saleID: string
}

export function UpdateSaleButton({ nftID, saleID }: UpdateSaleButtonProps) {
    const { refetchNFT } = useNFTFetch(nftID);
    const updateSaleModal = useOpenedState();

    return (
        <>
            <ActionButton
                view='secondary'
                onClick={updateSaleModal.open}
            >
                Change price
            </ActionButton>

            <UpdateSaleModal
                isOpen={updateSaleModal.isOpen}
                onClose={updateSaleModal.close}
                saleID={saleID}
                onSuccess={refetchNFT}
            />
        </>
    );
}