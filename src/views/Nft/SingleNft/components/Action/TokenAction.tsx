import { AuctionSale } from './AuctionSale/AuctionSale';
import { DirectSale } from './DirectSale/DirectSale';
import { useNFTStore } from '@/states/nft/store';
import { NFTSaleStatus } from '@/states/types';
import { NFTInStore } from '@/states/nft/types';

type TokenActionProps = {
    nft: NFTInStore
}

// TODO: add results actions
export function TokenAction({ nft }: TokenActionProps) {
    const auction = useNFTStore(state => state.auction);
    const isAuctionSale = nft.status === NFTSaleStatus.AUCTION && auction;
    const isDirectSale = nft.status === NFTSaleStatus.FIXED_PRICE && nft.price;

    if (isAuctionSale) {
        return (
            <AuctionSale
                nft={nft}
                auction={auction}
            />
        );
    }

    if (isDirectSale) {
        return (
            <DirectSale nft={nft} />
        );
    }

    return null;
}