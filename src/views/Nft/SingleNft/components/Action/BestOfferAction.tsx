import { useMemo } from 'react';
import { SaleAction } from './SaleAction';
import { findBestNFTOffer } from '@/utils/nft';
import { Address } from 'viem';
import { Auction, NFT, NFTSaleStatus, Sale } from '@/states/types';

type BestOfferActionProps = {
    nft: NFT
}

export function BestOfferAction({ nft }: BestOfferActionProps) {
    const action = useMemo<{
        status: NFTSaleStatus,
        sale?: Sale,
        auction?: Auction,
        maker?: Address
    }>(() => {
        // Try to find bestOffer
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
    }, [nft.owners]);

    return (<SaleAction
        nftID={nft.ID}
        sale={action.sale}
        auction={action.auction}
        status={action.status}
    />);
}