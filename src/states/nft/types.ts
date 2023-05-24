export type NFTQueryBody = {
	collectionID: string
	limit: number
	offset: number

	filter?: {
		search?: string
		sort?: 'RECENTLY_ADDED' | 'HIGH_PRICE_FIRST' | 'LOW_PRICE_FIRST'
		status?: 'FIXED_PRICE' | 'AUCTION'
		owners?: string
		minPrice?: string
		maxPrice?: string
		attributes?: {
			traitType: string
			value: string
		}[]
	},
}