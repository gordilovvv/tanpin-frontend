import { useMemo } from 'react';
import { ListButton } from '@/components/Nft';
import { ActionBox } from './Common';
import { DirectSale } from './DirectSale';
import { useTranslation } from '@/localization';
import { Auction, NFTSaleStatus, Sale } from '@/states/types';
import styles from './OwnerAction.module.scss';

type OwnerActionProps = {
    contractAddress: `0x${string}`
    tokenID: string,
    amount: number,
    sales: Sale[],
    auctions: Auction[],
    status: NFTSaleStatus
}

export function OwnerAction({ contractAddress, tokenID, amount, sales, status }: OwnerActionProps) {
    const { t } = useTranslation();

    const availableCopies = useMemo(() => {
        let availableCopies = amount;

        for (const sale of sales) {
            availableCopies -= sale.stock;
        }

        return availableCopies;
    }, [amount, sales]);

    if (status === NFTSaleStatus.NOT_FOR_SALE) {
        return (
            <ActionBox>
                <div className={styles.description}>
                    {t('This NFT is in your wallet')}
                </div>

                <ListButton
                    contractAddress={contractAddress}
                    tokenID={tokenID}
                    availableCopies={availableCopies}
                />
            </ActionBox>
        );
    }

    if (status === NFTSaleStatus.FIXED_PRICE) {
        const sale = sales[0];

        return (
            <DirectSale
                contractAddress={contractAddress}
                tokenID={tokenID}
                sale={sale}
                isOwner
            />
        );
    }

    // TODO: ДОБАВИТЬ АУКЦИОН
    if (status === NFTSaleStatus.AUCTION) {
        return (<>Auction</>);
    }

    return null;
}