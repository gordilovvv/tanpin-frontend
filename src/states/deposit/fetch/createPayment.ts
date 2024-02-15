import { gateApi } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { Address } from 'viem';

type CreatePaymentResponse = {
    redirectURL: string
}

export async function createPayment(amountIn: string, buyerAddress: Address, referralCode?: number): Promise<CreatePaymentResponse> {
    if (MOCK_API_CALLS) {
        return { redirectURL: 'https://tanpin.io' };
    }

    const { data } = await gateApi.post<CreatePaymentResponse>('/payment/create', {
        amountIn,
        buyerAddress,
        r: referralCode
    });

    return data;
}