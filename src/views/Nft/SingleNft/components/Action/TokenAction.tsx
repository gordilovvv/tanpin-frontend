import { AuctionSale } from './AuctionSale/AuctionSale';
import { DirectSale } from './DirectSale/DirectSale';
import { NFT, NFTSaleStatus } from '@/states/types';

type TokenActionProps = {
    nft: NFT
}

// TODO: add results actions
export function TokenAction({ nft }: TokenActionProps) {
    const isAuctionSale = nft.status === NFTSaleStatus.AUCTION && nft.auction;
    const isDirectSale = nft.status === NFTSaleStatus.FIXED_PRICE && nft.price;

    if (isAuctionSale) {
        return (
            <AuctionSale nft={nft} />
        );
    }

    if (isDirectSale) {
        return (
            <DirectSale nft={nft} />
        );
    }

    return null;
}