import { Game } from '../game/types';

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
        volumeChange?: string,
        floor: {
            amount: string
            currency: string
        }
    },
    attributes: {
        traitType: string
        values: string[]
    }[],
    game: {
        ID: Game['ID']
        name: Game['name']
    }
};

export type CollectionsFilter = {
    gameID?: string,
    userAddress?: string,
    search?: string,
    sort?: CollectionsSort,
    popular?: boolean
}

