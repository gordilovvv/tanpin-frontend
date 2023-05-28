import { NFTSaleStatus } from '../types';

export type NFTListFilter = {
	search?: string
	sort?: keyof typeof NFTSort
	status?: Exclude<keyof typeof NFTSaleStatus, 'NOT_FOR_SALE'>
	owners?: string
	minPrice?: string
	maxPrice?: string
	attributes?: {
		traitType: string
		value: string
	}[]
}

export const enum NFTSort {
	RECENTLY_ADDED = 'RECENTLY_ADDED',
	HIGH_PRICE_FIRST = 'HIGH_PRICE_FIRST',
	LOW_PRICE_FIRST = 'LOW_PRICE_FIRST'
}

export type NFTSortString = keyof typeof NFTSort;