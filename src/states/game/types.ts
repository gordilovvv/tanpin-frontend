import type { Collection } from '../collection/types';

export enum GamesSort {
    TRENDING = 'TRENDING',
    RECENTLY_ADDED = 'RECENTLY_ADDED'
}

export type GamesQueryBody = {
    filter: {
        search?: string
        sort?: `${ GamesSort }`,
        popular?: boolean
        includePopularCollections?: true
    }
}

export type GamesQueryResponse = Game[]

export type Game = {
    ID: string
	name: string
	logoURL: string
	imageURL: string 
	stats: {
		items: number
		collections: number
		volume: {
			amount: string
			currency: string
		}
	}
	popularCollections?: Collection[]
}
