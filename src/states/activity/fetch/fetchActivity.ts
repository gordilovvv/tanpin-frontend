import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { ActivityFilter } from '../types';
import { ActivityTransaction, TransactionType } from '@/states/types';

export async function fetchActivity({filter}: {filter:ActivityFilter}): Promise<ActivityTransaction[]> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 200));
        
        return [
            {
                type:TransactionType.TRANSFER ,
                owner: '0xabcdef12345678908', 
                transferedTo: '0x2234567890abcdef',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x3987654321fedcba4',
            },
            {
                type:TransactionType.TRANSFER ,
                owner: '0xabcdef12345678908', 
                transferedTo: '0x1234567890abcdef',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0587654321fedcba4',
            },
            {
                type:TransactionType.TRANSFER ,
                owner: '0xabcdef12345678908', 
                transferedTo: '0x1234567890abcdef',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba4',
            },
        ];
    }

    const { data } = await api.post<ActivityTransaction[]>('/activity/', filter);

    return data;
}
