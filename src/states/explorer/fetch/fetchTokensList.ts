import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { NFT, NFTSaleStatus } from '@/states/types';
import { TokensFilterState } from '../TokensFilterStore';
import { sample } from 'lodash';

export async function fetchTokensList(params: {
    collectionID?: string,
    ownerAddress?: string,
    offset: number,
    limit: number,
    filter?: TokensFilterState
}): Promise<{ items: NFT[], total: number }> {
    if (MOCK_API_CALLS) {
        // console.log({
        //     price: [params.filter?.minPrice, params.filter?.maxPrice],
        //     sort: params.filter?.sort,
        //     status: params.filter?.status
        // }, params.offset, params.limit);

        await new Promise<void>(r => setTimeout(r, 300));

        const total = 100;
        const finalTotal = params.offset + params.limit;
        const itemsCount = finalTotal <= total ? params.limit : params.limit - (finalTotal - total);

        return {
            items: [...Array(itemsCount).keys()].map(i => ({
                ID: `${params.offset + i}`,
                imageURL: sample(['https://lh3.googleusercontent.com/Ur2UfCWdR8H-KW-kcIxsMwIlRvZha1gRQmh-iNixO5JvFoDjpj17CPl9Bmt63qn9byrtE8dejCQo16Ap_Q_1vT2xNXPSJHU0CA=s400', 'https://lh3.googleusercontent.com/1uxoeG1FIcRPRqTJRSFWVwR951yI8WZeiER8kyyitGi9PUIcjY38VukqQf4DgJxvXI9IJl0SnO3sgwAG336rVjOpOsFJoXd_E6Q=s400', 'https://lh3.googleusercontent.com/9UhtO2bUeRC6Io1eLXy3mjINAjejHwFWvan1R-0GE8SGjhQ-ind_jjeHSnyGIUkUMxCf_lYXTLsY61tyLqKcSgLZi960JxtYMpg=s400', 'https://lh3.googleusercontent.com/CUsXXxdGBbfSOV7R7_oCz-08F_99t2EuLcABZB6nBdcMkpcKejerYgymY0IWerqF2gmq1xZ-5VnCga3GNVTWOXnxqDc_IJo8G6s=s1000']) as string,
                name: 'Porsche Cayenne',
                description: '',
                attributes: [],
                contractAddress: '0x',
                tokenID: '1',

                // owner: '0x',
                // sale: {
                //     saleID: '1',
                //     price: {
                //         amount: '100',
                //         currency: 'USDT'
                //     }
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
                supply: 100,
                owners: [{
                    id: '3',
                    owner: '0x241124m124m',
                    value: 4,
                    sales: [{
                        saleID: '1',
                        sold: 0,
                        stock: 2,
                        price: {
                            amount: '100',
                            currency: 'USDT'
                        }
                    }, {
                        saleID: '2',
                        sold: 0,
                        stock: 2,
                        price: {
                            amount: '80',
                            currency: 'USDT'
                        }
                    }],
                    auctions: [],
                    date: '01-06-2023',
                    status: NFTSaleStatus.AUCTION
                }],

                collection: {
                    ID: '1',
                    name: 'GTA Cars',
                    logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pLnNlYWRuLmlvL2djcy9maWxlcy9kNzkzNjQ2NGQ1NTk4ODIwNmMxYjE2YzY5Mjk4NTZmNi5qcGc/dz01MDAmYXV0bz1mb3JtYXQ=',
                    game: {
                        ID: '4',
                        name: 'GTANFT',
                        logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1UTlJkd1l2ZDVuc01Wb1VHWDRHdTJaV3dnYktidTlOTmR4REx0Y3dFRThLcg=='
                    }
                }
            })),
            total: total
        };
    }

    const { data } = await api.post<{
        counts: number
        tokens: NFT[]
    }>('/token/get.list', params);

    return {
        items: data.tokens,
        total: data.counts
    };
}