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

export type CollectionQueryBody = Partial<{
    filter: Partial<{
        gameID: string,
        search: string,
        sort: 'TRENDING' | 'RECENTLY_ADDED',
        popular: boolean,
    }>,
    pageNum: number,
}>

export type CollectionResponse = {
    page: number;
    countPage: number;
    collections: Collection[];
}


