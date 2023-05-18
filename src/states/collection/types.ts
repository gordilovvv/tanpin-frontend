export enum CollectionsSort {
    TRENDING = 'TRENDING',
    RECENTLY_ADDED = 'RECENTLY_ADDED'
}

export type Collection = {
    ID: string
    name: string
    symbol: string
    description: string
    logoURL: string
    coverURL: string
    stats: {
        items: number
        sales: number
        volume: {
            amount: string
            currency: string
        }
        floor: {
            amount: string
            currency: string
        }
    },
    attributes: {
        traitType: string
        values: string[]
    }[]
};

export type CollectionQueryBody = {
    filter?: {
        gameID?: string
        search?: string
        sort?: `${CollectionsSort}`
        popular?: boolean
    }
    pageNum: number
}

export type CollectionResponse = {
    page: number
    pageCount: number
    collections: Collection[]
}


