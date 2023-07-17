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
    WON_AUCTION = 'wonAuction',
    CLOSE_AUCTION = 'closeAuction',
    LOST_AUCTION = 'lostAuction'
}

export type ActivityTransaction = {
    ID: string
    type: ActivityType
    owner: Address,
    nftID: string,
    nftName: string,
    nftImage: string,
    transferedTo?: Address
    amount?: number
    price?: {
        amount: string
        currency: string
    },
    /** ID аукциона. Только для типов `wonAuction`, `closeAuction`, `loseAuction` */
    auctionID?: string,
    /** Закрыт ли аукцион для юзера. Только для типов `wonAuction`, `closeAuction`, `loseAuction` */
    doneAuctionAction?: boolean,
    date: string
    transactionHash: Hash
}

export type ActivityFilter = {
    userAddress?: Address
    tokenID?: string
    types: ActivityType[]
}