import type { Collection } from '../collection/types';

export type GamesQueryBody = {
    filter: {
        search?: string
        sort?: 'RECENTLY_ADDED' | 'TRENDING',
        popular?: boolean
        includePopularCollections?: true
    }
}

export type GamesQueryResponse = {
    ID: string
    name: string
    logoURL: string
    imageURL: string
    stats: {
        items: number
        collections: number
        // Объем торгов (1 DAY)
        volume: {
            amount: string
            currency: 'USDT' | 'CUSTOM_TOKEN'
        }
    }
    popularCollections?: Collection[]
}
