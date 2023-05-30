import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { HistoryTransaction, TransactionType } from '@/states/types';

export async function fetchNFTHistory(tokenID: string): Promise<HistoryTransaction[]> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 200));

        return [
            {
                type: TransactionType.MINT,
                owner: '0xabcdef12345678901',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba5',
            },
            {
                type: TransactionType.TRANSFER,
                owner: '0xabcdef12345678908',
                transferedTo: '0x1234567890abcdef',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba4',
            },
            {
                type: TransactionType.BUY,
                owner: '0xabcdef12345678902',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba3',
            },
            {
                type: TransactionType.LISTED,
                owner: '0xabcdef12345678903',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba2',
            },
            {
                type: TransactionType.UNLISTED,
                owner: '0xabcdef12345678904',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba1',
            },
        ];
    }

    const { data } = await api.get<HistoryTransaction[]>(`/token/get.history/${tokenID}`);

    return data;
}
