import { Address } from 'viem';
import { Auction, NFTSaleStatus, Sale } from '../types';

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