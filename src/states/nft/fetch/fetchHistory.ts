import axios from 'axios';
import { MOCK_API_CALLS } from '@/config';
import type { HistoryTransaction } from '@/states/types';
import { TransactionType } from '@/states/types';

export async function fetchHistory(id: string): Promise<HistoryTransaction[]> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 3000));
      
        return [
            {
                type: TransactionType.mint,
                owner: '0xabcdef1234567890',
                transferedTo: '0x1234567890abcdef',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba',
            },
            {
                type: TransactionType.transfer,
                owner: '0xabcdef1234567890',
                transferedTo: '0x1234567890abcdef',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba',
            },
            {
                type: TransactionType.buy,
                owner: '0xabcdef1234567890',
                transferedTo: '0x1234567890abcdef',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba',
            },
            {
                type: TransactionType.listed,
                owner: '0xabcdef1234567890',
                transferedTo: '0x1234567890abcdef',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba',
            },
            {
                type: TransactionType.unlisted,
                owner: '0xabcdef1234567890',
                transferedTo: '0x1234567890abcdef',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba',
            },    
        ];
    }

    const { data } = await axios.get<Promise<HistoryTransaction[]>>('token/get.history/' + id);

    return data;
}
