import { NFT, NFTSaleStatus } from '../types';

export enum NFTSort {
    RECENTLY_ADDED = 'RECENTLY_ADDED',
    HIGH_PRICE_FIRST = 'HIGH_PRICE_FIRST',
    LOW_PRICE_FIRST = 'LOW_PRICE_FIRST'
}

export type NFTInStore = Omit<NFT, 'auction'>;

export type NFTBestOffer = {
    status: NFTSaleStatus.FIXED_PRICE | NFTSaleStatus.AUCTION
    offer: {
        stock: number
        price: string
        currency: string
        auctionEndDate?: string
    }
} | {
    status: NFTSaleStatus.NOT_FOR_SALE
}