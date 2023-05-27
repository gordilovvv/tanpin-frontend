import axios from 'axios';
import { MOCK_API_CALLS } from '@/config';
import type { NFT } from '@/states/types';
import { AuctionStatus, NFTSaleStatus } from '@/states/types';

export async function fetchNFT(id: string): Promise<NFT> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 300));

        return {
            ID: '359293593',
            name: 'Nakamigos #2359',
            description: '20,000 unique crypto investors on the blockchain with commercial rights.',
            attributes: [
                {
                    traitType: 'Hat/Helmet',
                    value: 'Racer Yellow'
                },
                {
                    traitType: 'Type',
                    value: 'Human Pumpkin Spice'
                },
                {
                    traitType: 'Shirt/Jacket',
                    value: 'Puffy Coat Blue'
                },
                {
                    traitType: 'Mouth',
                    value: 'Flat'
                }
            ],
            imageURL: 'https://lh3.googleusercontent.com/fa9Ko3mnCaXg3JinoUwRgtz2xtYUuPARTHwIdAkdV4liyJfeYYyDTLmWTMdqelDbOrsdzdtfU_5hNizPU207XiSDL32_xiDjR1QG=s1000',
            contractAddress: '0x5e687642685E3c221364C570e6c4a84A66907ECe',
            tokenID: '2359',
            owner: '0x331F298e2Dfb55777f8692959cE0a5379Fe0C81F',
            auction: {
                ID: '1',
                tokenID: '2359',
                highestBid: {
                    amount: '5',
                    currency: 'USDT',
                },
                startPrice: {
                    amount: '3',
                    currency: 'USDT',
                },
                minStep: {
                    amount: '2',
                    currency: 'USDT',
                },
                startDate: 'Thu Apr 13 2023 21:13:05 GMT+0300 (Москва, стандартное время)',
                endDate: 'Fri Jun 30 2023 21:11:30 GMT+0300 (Москва, стандартное время)',
                betList: [{
                    transactionHash: '4525256234',
                    active: true,
                    owner: '634624615',
                    bet: {
                        amount: '3',
                        currency: 'USDT',
                    },
                    createdAt: String(new Date()),
                }],
                status: AuctionStatus.STARTED
            },
            price: {
                amount: '4',
                currency: 'USDT',
            },
            status: NFTSaleStatus.AUCTION
        };
    }

    const { data } = await axios.get<Promise<NFT>>('/token/get/:tokenID' + id);

    return data;
}
