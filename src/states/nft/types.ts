import { NFTSaleStatus } from '../types';

export type NFTListFilter = {
	search?: string
	sort?: NFTSort
	status?: Exclude<NFTSaleStatus, 'NOT_FOR_SALE'>,
	owners?: string
	minPrice?: string
	maxPrice?: string
	attributes?: {
		traitType: string
		value: string
	}[]
}

export type NFTSort = 'RECENTLY_ADDED' | 'HIGH_PRICE_FIRST' | 'LOW_PRICE_FIRST'
