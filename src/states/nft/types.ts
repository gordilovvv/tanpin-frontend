import { Address } from 'viem';
import { Auction, NFTSaleStatus, Sale } from '../types';

export enum NFTSort {
    RECENTLY_ADDED = 'RECENTLY_ADDED',
    HIGH_PRICE_FIRST = 'HIGH_PRICE_FIRST',
    LOW_PRICE_FIRST = 'LOW_PRICE_FIRST'
}

export type NFTBestOffer = {
    status: NFTSaleStatus.FIXED_PRICE | NFTSaleStatus.AUCTION
    offer: {
        maker: Address,
        sale?: Sale,
        auction?: Auction
    }
} | {
    status: NFTSaleStatus.NOT_FOR_SALE
}