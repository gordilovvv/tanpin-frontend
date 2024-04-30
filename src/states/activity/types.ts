import { Address, Hash } from 'viem';

export type ActivityCategory = 'nft' | 'user';

export enum ActivityType {
    MINT = 'mint',
    TRANSFER = 'transfer',
    BUY_DIRECT_SALE = 'buyDirectSale',
    SELL_DIRECT_SALE = 'sellDirectSale',
    CREATE_DIRECT_SALE = 'createDirectSale',
    UPDATE_DIRECT_SALE = 'updateDirectSale',
    CLOSE_DIRECT_SALE = 'closeDirectSale',
}

interface BaseActivityTransaction {
    hash: Hash,
    chain: string,
    type: ActivityType,
    fromAddress: `0x${string}`,
    contractAddress: `0x${string}`,
    tokenId: number,
    tokenName: string,
    tokenImageUrl: string,
    createdAt: string
}

interface MintTransaction extends BaseActivityTransaction {
    type: ActivityType.MINT,
    data: {
        to: `0x${string}`;
        amount: number;
        gameName: string;
        gameLogoUrl: string;
    }
}

interface TransferTransaction extends BaseActivityTransaction {
    type: ActivityType.TRANSFER,
    data: {
        from: `0x${string}`;
        to: `0x${string}`;
        amount: number;
    }
}

interface DirectSaleData {
    saleId: number;
    buyer: `0x${string}`;
    seller: `0x${string}`;
    amount: number;
    price: string;
    currency: string;
}

interface BuyDirectSaleTransaction extends BaseActivityTransaction {
    type: ActivityType.BUY_DIRECT_SALE,
    data: DirectSaleData
}

interface SellDirectSaleTransaction extends BaseActivityTransaction {
    type: ActivityType.SELL_DIRECT_SALE,
    data: DirectSaleData
}

interface CreateDirectSaleTransaction extends BaseActivityTransaction {
    type: ActivityType.CREATE_DIRECT_SALE,
    data: {
        saleId: number;
        amount: number;
        price: string;
        currency: string;
    }
}

interface UpdateDirectSaleTransaction extends BaseActivityTransaction {
    type: ActivityType.UPDATE_DIRECT_SALE,
    data: {
        saleId: number;
        amount: number;
        price: string;
        currency: string;
    }
}

interface CloseDirectSaleTransaction extends BaseActivityTransaction {
    type: ActivityType.CLOSE_DIRECT_SALE,
    data: {
        saleId: number;
        amount: number
    }
}

export type ActivityTransaction =
    | MintTransaction
    | TransferTransaction
    | BuyDirectSaleTransaction
    | SellDirectSaleTransaction
    | CreateDirectSaleTransaction
    | UpdateDirectSaleTransaction
    | CloseDirectSaleTransaction

export type ActivityFilter = {
    address: Address // contract address of collection || user address
    tokenID?: string // only if contract address
    types: ActivityType[]
}