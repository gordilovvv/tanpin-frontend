import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NFT, AuctionStatus, NFTSaleStatus, Auction } from '@/states/types';

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

            // owner: '0xE45133bD72217782d834C43Eb54adA97dE1B7a93',
            // sale: {
            //     saleID: '1',
            //     price: {
            //         amount: '100',
            //         currency: 'USDT'
            //     },
            // },
            // // auction: {
            // //     highestBid: {
            // //         amount: '100',
            // //         currency: 'USDT'
            // //     },
            // //     endDate: '2023-06-26T03:50:26.615+00:00'
            // // },
            // status: NFTSaleStatus.FIXED_PRICE,

            sold: 4,
            stock: 1200,
            supply: 1400,
            owners: [
                {
                    id: '5',
                    owner: '0x453f298e2dfb55777f8692959ce0a5379fe0c41f',
                    value: 100,
                    sales: [],
                    auctions: [],
                    date: '01-06-2023',
                    status: NFTSaleStatus.NOT_FOR_SALE
                },
                {
                    id: '3',
                    owner: '0xE45133bD72217782d834C43Eb54adA97dE1B7a93',
                    value: 4,
                    sales: [{
                        saleID: '15',
                        sold: 0,
                        stock: 2,
                        price: {
                            amount: '100',
                            currency: 'USDT'
                        }
                    }, {
                        saleID: '16',
                        sold: 0,
                        stock: 2,
                        price: {
                            amount: '80',
                            currency: 'USDT'
                        }
                    }],
                    // sales: [],
                    auctions: [],
                    date: '01-06-2023',
                    status: NFTSaleStatus.FIXED_PRICE
                },
                {
                    id: '4',
                    owner: '0x331f298e2dfb55777f8692959ce0a5379fe0c81f',
                    value: 100,
                    sales: [{
                        saleID: '5',
                        sold: 0,
                        stock: 60,
                        price: {
                            amount: '30',
                            currency: 'USDT'
                        }
                    }],
                    auctions: [],
                    date: '01-06-2023',
                    status: NFTSaleStatus.FIXED_PRICE
                }],

            collection: {
                ID: '1',
                name: 'Cars Drop 2023',
                logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1Xdm9kUnhrUFhmajRWU3laa0Z4ZlhvMmpIZEhGSjl3NUprd1ZOYWdjSlFkcQ==',
                game: {
                    ID: '1',
                    name: 'GTA 5 RP',
                    logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2JmcHhaUnhLc3V4ek5QcGp3akF6QURsMTZ3eFFmalN6UWJRNFBNQ251V25OTDVDUS15dktxWFFyRzRtWmVCNjN5WTRVSDlLQV9sdk4tR0ZHUlNOOG9xcU15N0xkRzNSX1hMX2M9czEyMA=='
                }
            }
        };
    }

    const { data: nft } = await api.get<NFT>(`/token/get/${id}`);

    return nft;
}
