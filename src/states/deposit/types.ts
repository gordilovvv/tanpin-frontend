export type InputFiatCurrency = {
    id: string,
    symbol: string,
    decimals: number,
    limits: { min: string, max: string };
};

export type InputTokenCurrency = {
    id: string,
    chain: string,
    symbol: string,
    decimals: number,
    limits: { min: string, max: string };
};

export type InputCurrency = InputFiatCurrency | InputTokenCurrency;

// Always token
export type OutputCurrency = {
    id: string,
    symbol: string,
    decimals: number
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