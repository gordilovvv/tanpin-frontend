import { NFTBestOffer } from '@/states/nft/types';
import { MultipleNFT, NFT, NFTSaleStatus, SingleNFT } from '@/states/types';
import BigNumber from 'bignumber.js';

export function isSingleNFT(nft: NFT): nft is SingleNFT {
    return 'owner' in nft;
}

export function isMultipleNFT(nft: NFT): nft is MultipleNFT {
    return 'owners' in nft;
}

export function findBestNFTOffer(owners: MultipleNFT['owners']): NFTBestOffer {
    let status: NFTSaleStatus = NFTSaleStatus.NOT_FOR_SALE;
    let bestOffer: {
        stock: number,
        price: string,
        currency: string
        auctionEndDate?: string
    } | undefined;

    for (const owner of owners) {
        if (owner.sales) {
            const minSalePrice = BigNumber.min(...owner.sales.map(sale => new BigNumber(sale.price.amount)));

            if (!bestOffer || minSalePrice.isLessThan(new BigNumber(bestOffer.price))) {
                const minSale = owner.sales.find(sale => new BigNumber(sale.price.amount).isEqualTo(minSalePrice));

                if (minSale) {
                    bestOffer = {
                        stock: minSale.stock,
                        price: minSale.price.amount,
                        currency: minSale.price.currency
                    };

                    status = NFTSaleStatus.FIXED_PRICE;
                }
            }
        }
        if (owner.auctions) {
            const minAuctionPrice = BigNumber.min(...owner.auctions.map(auction => new BigNumber(auction.highestBid.amount)));

            if (!bestOffer || minAuctionPrice.isLessThan(new BigNumber(bestOffer.price))) {
                const minAuction = owner.auctions.find(auction => new BigNumber(auction.highestBid.amount).isEqualTo(minAuctionPrice));

                if (minAuction) {
                    bestOffer = {
                        stock: minAuction.amount,
                        price: minAuction.highestBid.amount,
                        currency: minAuction.highestBid.currency,
                        auctionEndDate: minAuction.endDate
                    };

                    status = NFTSaleStatus.AUCTION;
                }
            }
        }
    }

    if (bestOffer) {
        return {
            status,
            offer: bestOffer
        };
    } else {
        return {
            status: NFTSaleStatus.NOT_FOR_SALE
        };
    }
}