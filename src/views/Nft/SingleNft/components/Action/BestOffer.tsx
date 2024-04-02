import { useMemo } from 'react';
import { DirectSale } from './DirectSale';
import { NotForSale } from './NotForSale';
import { findBestNFTOffer } from '@/utils/nft';
import { Auction, NFT, NFTSaleStatus, Sale } from '@/states/types';

type BestOfferActionProps = {
    nft: NFT
}

export function BestOffer({ nft }: BestOfferActionProps) {
    const action = useMemo<{
        status: NFTSaleStatus,
        sale?: Sale,
        auction?: Auction,
        maker?: `0x${string}`
    }>(() => {
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

    if (action.sale && action.status === NFTSaleStatus.FIXED_PRICE) {
        return (<DirectSale
            contractAddress={nft.contractAddress}
            tokenID={nft.tokenID}
            sale={action.sale}
        />);
    }

    // TODO: ДОБАВИТЬ АУКЦИОН
    if (action.auction && action.status === NFTSaleStatus.AUCTION) {
        return (<div>Auction</div>);
    }

    return (<NotForSale />);
}