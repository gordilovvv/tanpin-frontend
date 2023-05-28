import { Collection } from './collection/types';

export type NFT = {
    ID: string
    name: string
    description: string
    attributes: NFTAttribute[]
    imageURL: string
    contractAddress: string
    tokenID: string
    owner: string
    auction?: Auction
    price?: {
        amount: string
        currency: string
    },
    collection: {
        ID: Collection['ID'],
        name: Collection['name']
    }
    status: NFTSaleStatus
}

export const enum NFTSaleStatus {
    FIXED_PRICE = 'FIXED_PRICE',
    AUCTION = 'AUCTION',
    NOT_FOR_SALE = 'NOT_FOR_SALE'
}

export type NFTSaleStatusString = keyof typeof NFTSaleStatus;

export type NFTAttribute = {
    traitType: string
    value: string
}

export type Auction = {
    ID: string
    tokenID: string
    highestBid: {
        amount: string,
        currency: string
    }
    startPrice: {
        amount: string,
        currency: string
    }
    minStep: {
        amount: string,
        currency: string
    }
    startDate: string
    endDate: string
    betList: AuctionBet[]
    status: AuctionStatus
}

export const enum AuctionStatus {
    OPENED = 'OPENED',
    CLOSED = 'CLOSED',
    CANCELED = 'CANCELED'
}

export type AuctionBet = {
    transactionHash: string
    active: boolean
    owner: string
    bet: {
        amount: string
        currency: string
    }
    createdAt: string
}