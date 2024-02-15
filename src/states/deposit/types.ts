export type PaymentLimits = {
    min: string,
    max: string
}

/** При покупке с карты дарим N кол-во MATIC на газ */
export type MaticDistribution = {
    threshold: number,
    amount: string
}[];

/** Награда за покупки друзей */
export type AffiliateReward = {
    threshold: number;
    amount: string;
}[]

export type ReferralFriend = {
    userId: number;
    currencyOut: string;
    address: string;
    totalReward: string;
};