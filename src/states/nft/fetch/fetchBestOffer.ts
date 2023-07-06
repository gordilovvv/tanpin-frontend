import { Address } from 'viem';
import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

type BestOffer = {
    saleID: string
    maker: Address
    price: {
        amount: string
        currency: string
    }
    sold: number
    stock: number
} | null

export async function fetchBestOffer(nftID: string): Promise<BestOffer | undefined> {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 400));

        return {
            saleID: '22',
            maker: '0xE45133bD72217782d834C43Eb54adA97dE1B7a93',
            price: {
                amount: '100',
                currency: 'USDT'
            },
            sold: 0,
            stock: 100
        };
    }

    const { data } = await api.get<BestOffer | undefined>(`/token/get.bestSellOffer/${nftID}`);

    return data;
}