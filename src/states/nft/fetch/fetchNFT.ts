import axios from 'axios';
import { MOCK_API_CALLS } from '@/config';
import type { NFT } from '@/states/types';
import { AuctionStatus, NFTSaleStatus} from '@/states/types';

export async function fetchNFT(id: string): Promise<NFT> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 300));
       
        return {
            ID: '359293593',
            name: 'Имя nft',
            description: 'Описание nftОписание nftОписание nftОписание nftОписание nftОписание nftОписание nftОписание nftОписание nftОписание nft',
            attributes: [
                {
                    traitType: 'traitType',
                    value: 'value'
                },
                {
                    traitType: 'traitType2',
                    value: 'value2'
                }
            ],
            imageURL: 'https://images.thevoicemag.ru/upload/img_cache/1c8/1c83f6f695855deceec54ebd48a3d40b_cropped_666x833.jpg',
            contractAddress: '393259832989',
            tokenID: '324234234',
            owner: '32423423523',
            auction: {
                ID: '32637134',
                tokenID: '436434',
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
                startDate: String(new Date()),
                endDate: String(new Date()),
                betList: [ {
                    transactionHash: '4525256234',
                    active: true,
                    owner: '634624615',
                    bet: {
                        amount: '3',
                        currency: 'USDT',
                    },
                    createdAt: String(new Date()),
                }],
                status: AuctionStatus.CLOSED
            },
            price: {
                amount: '4',
                currency: 'USDT',
            },
            status: NFTSaleStatus.FIXED_PRICE
        };
    }

    const { data } = await axios.get<Promise<NFT>>('/token/get/:tokenID' + id);

    return data;
}
