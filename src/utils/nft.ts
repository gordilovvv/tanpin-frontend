import BigNumber from 'bignumber.js';
import { NFTBestOffer } from '@/states/nft/types';
import { Auction, NFT, NFTSaleStatus, Sale } from '@/states/types';
import { Address } from 'viem';
import { isAddressEqual, isAddressOwner } from './addressHelper';

export function isUniqueNFT(nft: NFT) {
    return nft.maxSupply === 1;
}

export function isMultipleNFT(nft: NFT) {
    return nft.maxSupply > 1;
}

export function findBestNFTOffer(owners: NFT['owners']): NFTBestOffer {
    let status: NFTSaleStatus = NFTSaleStatus.NOT_FOR_SALE;
    let bestOffer: {
        maker: Address,
        sale?: Sale,
        auction?: Auction
    } | undefined;

    for (const owner of owners) {
        const bestOfferPrice = bestOffer?.sale?.price || bestOffer?.auction?.highestBid;

        if (owner.sales) {
            const minSalePrice = BigNumber.min(...owner.sales.map(sale => new BigNumber(sale.price.amount)));

            if (!bestOffer || bestOfferPrice && minSalePrice.isLessThan(new BigNumber(bestOfferPrice.amount))) {
                const minSale = owner.sales.find(sale => new BigNumber(sale.price.amount).isEqualTo(minSalePrice));

                if (minSale) {
                    bestOffer = {
                        maker: owner.owner,
                        sale: minSale,
                        auction: undefined
                    };

                    status = NFTSaleStatus.FIXED_PRICE;
                }
            }
        }

        if (owner.auctions) {
            const minAuctionPrice = BigNumber.min(...owner.auctions.map(auction => new BigNumber(auction.highestBid.amount)));

            if (!bestOffer || bestOfferPrice && minAuctionPrice.isLessThan(new BigNumber(bestOfferPrice.amount))) {
                const minAuction = owner.auctions.find(auction => new BigNumber(auction.highestBid.amount).isEqualTo(minAuctionPrice));

                if (minAuction) {
                    bestOffer = {
                        maker: owner.owner,
                        sale: undefined,
                        auction: minAuction
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

export function findOwnerOffer(owners: NFT['owners'], userAddress: Address): {
    sale?: Sale,
    auction?: Auction,
    status?: NFTSaleStatus
} {
    let sale: Sale | undefined;
    let auction: Auction | undefined;
    let status: NFTSaleStatus | undefined;

    for (const owner of owners) {
        if (isAddressEqual(owner.owner, userAddress)) {
            sale = owner.sales[0];
            auction = owner.auctions[0];
            status = owner.status;

            break;
        }
    }

    return {
        sale,
        auction,
        status
    };
}

export function isOwnerOfMultipleNFT(address: Address | undefined, owners: NFT['owners']) {
    if (!address || !owners.length) {
        return undefined;
    }

    try {
        for (const owner of owners) {
            if (isAddressOwner(owner.owner as Address, address)) {
                return owner;
            }
        }
    } catch (error) {
        return undefined;
    }
}