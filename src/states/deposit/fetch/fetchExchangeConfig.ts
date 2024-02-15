import { gateApi } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { AffiliateReward, MaticDistribution, PaymentLimits } from '../types';

type ExchangeInfoResponse = {
    limits: PaymentLimits,
    maticDistribution: MaticDistribution,
    affiliateReward: AffiliateReward
};

export async function fetchExchangeConfig(): Promise<ExchangeInfoResponse> {
    if (MOCK_API_CALLS) {
        return {
            limits: { min: '10', max: '75000' },
            maticDistribution: [
                { threshold: 100, amount: '1' },
                { threshold: 50, amount: '0.2' },
                { threshold: 0, amount: '0.1' },
            ],
            affiliateReward: [
                { threshold: 10000, amount: '15' },
                { threshold: 5000, amount: '10' },
                { threshold: 0, amount: '5' },
            ]
        };
    }

    const { data } = await gateApi.get<ExchangeInfoResponse>('/config');

    return data;
}