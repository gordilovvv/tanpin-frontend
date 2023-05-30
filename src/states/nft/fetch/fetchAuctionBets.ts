import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { AuctionBet } from '@/states/types';

export async function fetchAuctionBets(id: string): Promise<AuctionBet[]> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 300));

        return [
            {
                transactionHash: '0xfsdgjdsjgjsdglkgsd',
                active: true,
                owner: '0x1234567890abcdef',
                bet: {
                    amount: '100',
                    currency: 'USDT',
                },
                createdAt: 'Thu Apr 13 2023 21:13:05 GMT+0300 (Москва, стандартное время)',
            },
            {
                transactionHash: '0xabcdef1234567890',
                active: true,
                owner: '0x1234567890abcdef',
                bet: {
                    amount: '100',
                    currency: 'USDT',
                },
                createdAt: 'Thu Apr 13 2023 21:13:05 GMT+0300 (Москва, стандартное время)',
            },
            {
                transactionHash: '0x5235jfsah523gasj',
                active: true,
                owner: '0x1234567890abcdef',
                bet: {
                    amount: '100',
                    currency: 'USDT',
                },
                createdAt: 'Thu Apr 13 2023 21:13:05 GMT+0300 (Москва, стандартное время)',
            },
        ];
    }

    const { data } = await api.get<AuctionBet[]>(`/auction/get.bets/${id}`);

    return data;
}
