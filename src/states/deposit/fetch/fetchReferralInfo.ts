import { gateApi } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { Address } from 'viem';
import { ReferralFriend } from '../types';

type ReferralResponse = {
    id: number,
    address: Address,
    totalReward: string,
    friends: ReferralFriend[],
    status: boolean
};

export async function fetchReferralInfo(address: Address): Promise<ReferralResponse> {
    if (MOCK_API_CALLS) {
        return {
            id: 2754,
            address: '0x',
            totalReward: '1000',
            friends: [
                {
                    userId: 1,
                    currencyOut: 'TANPIN',
                    address: '0xde9AE97Dda4ecc3Aa696e6572180c14843cAbfC47',
                    totalReward: '30.214012412421412'
                },
                {
                    userId: 2,
                    currencyOut: 'TANPIN',
                    address: '0xda9AE97Dda4ecc3Aa696e6572180c14843cAbfC47',
                    totalReward: '4020.3023514'
                }
            ],
            status: false
        };
    }

    const { data } = await gateApi.get<ReferralResponse>(`/referral?address=${address.trim()}`);

    return data;
}