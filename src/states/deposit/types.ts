export type PaymentLimits = {
    min: string,
    max: string
}

/** При покупке с карты дарим N кол-во MATIC на газ */
export type MaticDistribution = {
    threshold: number,
    amount: string
}[];