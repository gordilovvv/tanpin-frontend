import { NFTSaleStatus } from '../types';

export type NFTListFilter = {
	search?: string
	sort?: NFTSort
	status?: NFTSaleStatus.AUCTION | NFTSaleStatus.FIXED_PRICE,
	owners?: string
	minPrice?: string
	maxPrice?: string
	attributes?: {
		traitType: string
		value: string
	}[]
}

export enum NFTSort {
	RECENTLY_ADDED = 'RECENTLY_ADDED',
	HIGH_PRICE_FIRST = 'HIGH_PRICE_FIRST',
	LOW_PRICE_FIRST = 'LOW_PRICE_FIRST'
}