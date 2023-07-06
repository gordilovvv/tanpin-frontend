import { Address, Hash } from 'viem';

export enum ActivityType {
    MINT = 'mint',
    TRANSFER = 'transfer',
    BUY = 'buy',
    SALE = 'sale',
    LISTED = 'listed',
    UNLISTED = 'unlisted',
    BID = 'bid',
    CREATE_AUCTION = 'createAuction',
    CLOSE_AUCTION = 'closeAuction',
    REFUND_BID = 'refundBid'
}

export type ActivityTransaction = {
    ID: string
    type: ActivityType
    owner: Address,
    transferedTo?: Address
    amount?: number
    price?: {
        amount: string
        currency: string
    }
    date: string
    transactionHash: Hash
}

export type ActivityFilter = {
    userAddress?: Address
    tokenID?: string
    types: ActivityType[]
}