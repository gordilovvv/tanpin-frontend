export type Activity = {
	id: string // UID из базы
	type: 'mint' | 'transfer' | 'buy' | 'sale' | 'listed' | 'unlisted' | 'bid' | 'createAuction' | 'closeAuction' | 'refundBid'
	owner: string, // Адрес кто это действие сделал
	transferedTo?: string
	// Только у множественных
	amount?: number
	price?: {
		amount: string,
    currency: 'USDT' | 'CUSTOM_TOKEN'
	}, // Только для buy, sale, bid
	date: string // Базовый формат
	transactionHash: string
}