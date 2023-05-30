import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { NFT, AuctionStatus, NFTSaleStatus, Auction } from '@/states/types';

export async function fetchNFT(id: string): Promise<{
    nft: NFT,
    auction?: Auction
}> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 300));

        return {
            nft: {
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
                price: {
                    amount: '4',
                    currency: 'USDT',
                },
                collection: {
                    ID: '1',
                    name: 'Cars Drop 2023',
                    logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1Xdm9kUnhrUFhmajRWU3laa0Z4ZlhvMmpIZEhGSjl3NUprd1ZOYWdjSlFkcQ==',
                    game: {
                        ID: '1',
                        name: 'GTA 5 RP',
                        logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2JmcHhaUnhLc3V4ek5QcGp3akF6QURsMTZ3eFFmalN6UWJRNFBNQ251V25OTDVDUS15dktxWFFyRzRtWmVCNjN5WTRVSDlLQV9sdk4tR0ZHUlNOOG9xcU15N0xkRzNSX1hMX2M9czEyMA=='
                    }
                },
                status: NFTSaleStatus.AUCTION
            },
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
            }
        };
    }

    const { data: { auction, ...nft } } = await api.get<NFT & { auction?: Auction }>(`/token/get/${id}`);

    return {
        nft,
        auction
    };
}
