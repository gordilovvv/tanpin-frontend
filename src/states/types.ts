export type NFT = {
    ID: string
    name: string
    description: string
    attributes: NFTAttribute[]
    imageURL: string
    contractAddress: `0x${string}`
    tokenID: string
    sold: number
    stock: number
    totalSupply: number
    maxSupply: number
    owners: NFTOwner[],
    collection: {
        ID: string
        name: string
        logoURL: string
    }
    metaDataURL: string
}

export type NFTAttribute = {
    traitType: string
    value: string
}

export type NFTOwner = {
    owner: `0x${string}`
    value: number
    sales: Sale[]
    auctions: Auction[]
    status: NFTSaleStatus
}

export enum NFTSaleStatus {
    FIXED_PRICE = 'fixed_price',
    AUCTION = 'auction',
    NOT_FOR_SALE = 'not_for_sale'
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