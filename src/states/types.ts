import { Address } from 'viem';

export type NFT = SingleNFT | MultipleNFT;

export type SingleNFT = {
    ID: string
    name: string
    description: string
    attributes: {
        traitType: string
        value: string
    }[]
    imageURL: string
    contractAddress: Address
    tokenID: string
    owner: Address
    sale?: Sale
    auction?: Auction
    status: NFTSaleStatus
    collection: {
        ID: string
        name: string
        logoURL: string
        game: {
            ID: string
            name: string
            logoURL: string
        }
    }
}

export type MultipleNFT = {
    ID: string
    name: string
    description: string
    attributes: {
        traitType: string
        value: string
    }[]
    imageURL: string
    contractAddress: Address
    tokenID: string
    sold: number
    stock: number
    supply: number
    owners: NFTOwner[]
    collection: {
        ID: string
        name: string
        logoURL: string
        game: {
            ID: string
            name: string
            logoURL: string
        }
    }
}

export type NFTOwner = {
    id: string
    owner: Address
    value: number
    sales: Sale[]
    auctions: Auction[]
    date: string
    status: NFTSaleStatus
}

export enum NFTSaleStatus {
    FIXED_PRICE = 'FIXED_PRICE',
    AUCTION = 'AUCTION',
    NOT_FOR_SALE = 'NOT_FOR_SALE'
}

export type NFTAttribute = {
    traitType: string
    value: string
}

export type Sale = {
    saleID: string
    sold: number
    stock: number
    price: {
        amount: string
        currency: string
    }
}

export type Auction = {
    ID: string
    tokenID: string
    amount: number
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

export enum AuctionStatus {
    NOT_STARTED = 'NOT_STARTED',
    STARTED = 'STARTED',
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