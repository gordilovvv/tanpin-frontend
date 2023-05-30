import { NFT } from '../types';

export enum NFTSort {
	RECENTLY_ADDED = 'RECENTLY_ADDED',
	HIGH_PRICE_FIRST = 'HIGH_PRICE_FIRST',
	LOW_PRICE_FIRST = 'LOW_PRICE_FIRST'
}

export type NFTInStore = Omit<NFT, 'auction'>;