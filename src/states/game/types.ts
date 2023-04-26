import type { Collection } from '../collection/types';

export type GamesQueryBody = {
    filter: {
        search?: string
        sort?: 'RECENTLY_ADDED' | 'TRENDING',
        popular?: boolean
        includePopularCollections?: true
    }
}

export type GamesQueryResponse = Game & {
    stats: GameStats
    popularCollections?: Collection[]
}

export type Game = {
    ID: string
    name: string
    logoURL: string
    imageURL: string
}

export type GameStats = {
    items: number
    collections: number
    // Объем торгов (1 DAY)
    volume: {
        amount: string
        currency: 'USDT' | 'CUSTOM_TOKEN'
    }
}

