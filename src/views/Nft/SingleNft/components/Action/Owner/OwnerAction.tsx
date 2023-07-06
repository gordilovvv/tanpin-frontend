import { Auction, NFTSaleStatus, Sale } from '@/states/types';
import { ActionBox } from '../Box/ActionBox';
import { ListButton } from '../Buttons/ListButton';
import { DirectSale } from '../DirectSale/DirectSale';
import styles from './OwnerAction.module.scss';

type OwnerActionProps = {
    nftID: string,
    tokenID: string,
    availableEditions?: number,
    sale?: Sale,
    auction?: Auction,
    status: NFTSaleStatus
}

export function OwnerAction({ nftID, tokenID, availableEditions, sale, status }: OwnerActionProps) {
    if (status === NFTSaleStatus.NOT_FOR_SALE) {
        return (
            <ActionBox>
                <div className={styles.description}>
                    This NFT is in your wallet
                </div>

                <ListButton
                    tokenID={tokenID}
                    availableEditions={availableEditions}
                />
            </ActionBox>
        );
    }

    if (sale && status === NFTSaleStatus.FIXED_PRICE) {
        return (
            <DirectSale
                nftID={nftID}
                sale={sale}
                isOwner
            />
        );
    }

    // TODO: ДОБАВИТЬ АУКЦИОН
    // if (auction && status === NFTSaleStatus.AUCTION) {
    //     return null;
    // }

    return null;
}