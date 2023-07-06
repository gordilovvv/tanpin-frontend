import { useMemo } from 'react';
import { Spin } from '@/uikit';
import { ActionBox } from './Box/ActionBox';
import { SaleAction } from './SaleAction';
import { useBestOffer } from '@/states/nft/hooks/useBestOffer';
import { findBestNFTOffer } from '@/utils/nft';
import { Address } from 'viem';
import { Auction, MultipleNFT, NFTSaleStatus, Sale } from '@/states/types';

type BestOfferActionProps = {
    nft: MultipleNFT
}

export function BestOfferAction({ nft }: BestOfferActionProps) {
    const { bestOffer, isLoading } = useBestOffer(nft.ID);

    const action = useMemo<{
        status: NFTSaleStatus,
        sale?: Sale,
        auction?: Auction,
        maker?: Address
    }>(() => {
        //  If we got a bestOffer
        if (bestOffer) {
            const { saleID, sold, stock, price, maker } = bestOffer;

            return {
                status: NFTSaleStatus.FIXED_PRICE,
                maker: maker,
                sale: {
                    saleID,
                    sold,
                    stock,
                    price
                }
            };
        }

        // Or try to find bestOffer
        if (nft.owners.length) {
            const bestOfferLocal = findBestNFTOffer(nft.owners);

            if ('offer' in bestOfferLocal) {
                const { offer, status } = bestOfferLocal;

                return {
                    status,
                    maker: offer.maker,
                    sale: offer.sale,
                    auction: offer.auction
                };
            }
        }

        return { status: NFTSaleStatus.NOT_FOR_SALE };
    }, [bestOffer, nft.owners]);

    if (isLoading) {
        return (<ActionBox style={{ minHeight: '144px' }}>
            <Spin size='s' />
        </ActionBox>);
    }

    return (<SaleAction
        nftID={nft.ID}
        sale={action.sale}
        auction={action.auction}
        status={action.status}
    />);
}