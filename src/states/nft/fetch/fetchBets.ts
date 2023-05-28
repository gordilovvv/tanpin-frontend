import axios from 'axios';
import { MOCK_API_CALLS } from '@/config';
import { AuctionBet } from '@/states/types';

export async function fetchBets(id: string): Promise<AuctionBet[]> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 5000));
      
        return [
            {
                transactionHash: '0xabcdef1234567890',
                active: true,
                owner: '0x1234567890abcdef',
                bet: {
                    amount: '100',
                    currency: 'USDT',
                },
                createdAt:'2023-05-29',
            }, 
            {
                transactionHash: '0xabcdef1234567890',
                active: true,
                owner: '0x1234567890abcdef',
                bet: {
                    amount: '100',
                    currency: 'USDT',
                },
                createdAt:'2023-05-29',
            },
            {
                transactionHash: '0xabcdef1234567890',
                active: true,
                owner: '0x1234567890abcdef',
                bet: {
                    amount: '100',
                    currency: 'USDT',
                },
                createdAt:'2023-05-29',
            }, 
        ];
    }

    const { data } = await axios.get<Promise<AuctionBet[]>>('auction/get.bets/' + id);

    return data;
}
