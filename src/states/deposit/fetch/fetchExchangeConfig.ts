import { gateApi } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { MaticDistribution, PaymentLimits } from '../types';

type ExchangeInfoResponse = {
    limits: PaymentLimits,
    maticDistribution: MaticDistribution
};

export async function fetchExchangeConfig(): Promise<ExchangeInfoResponse> {
    if (MOCK_API_CALLS) {
        return {
            limits: { min: '10', max: '75000' },
            maticDistribution: [
                { threshold: 100, amount: '1' },
                { threshold: 50, amount: '0.2' },
                { threshold: 0, amount: '0.1' },
            ]
        };
    }

    const { data } = await gateApi.get<ExchangeInfoResponse>('/config');

    return data;
}