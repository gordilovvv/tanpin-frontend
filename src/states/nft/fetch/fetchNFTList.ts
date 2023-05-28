import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { NFT, NFTSaleStatus } from '@/states/types';
import { sample } from 'lodash';
import { FilterState } from '@/states/collection/filterStore';

export async function fetchNFTList(params: {
    collectionID?: string,
    offset: number,
    limit: number,
    filter?: FilterState
}): Promise<{
    items: NFT[],
    total: number
}> {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 300));

        return {
            items: [...Array(params.limit).keys()].map(i => ({
                ID: `${params.offset + i}`,
                imageURL: sample(['https://lh3.googleusercontent.com/Ur2UfCWdR8H-KW-kcIxsMwIlRvZha1gRQmh-iNixO5JvFoDjpj17CPl9Bmt63qn9byrtE8dejCQo16Ap_Q_1vT2xNXPSJHU0CA=s400', 'https://lh3.googleusercontent.com/1uxoeG1FIcRPRqTJRSFWVwR951yI8WZeiER8kyyitGi9PUIcjY38VukqQf4DgJxvXI9IJl0SnO3sgwAG336rVjOpOsFJoXd_E6Q=s400', 'https://lh3.googleusercontent.com/9UhtO2bUeRC6Io1eLXy3mjINAjejHwFWvan1R-0GE8SGjhQ-ind_jjeHSnyGIUkUMxCf_lYXTLsY61tyLqKcSgLZi960JxtYMpg=s400', 'https://lh3.googleusercontent.com/CUsXXxdGBbfSOV7R7_oCz-08F_99t2EuLcABZB6nBdcMkpcKejerYgymY0IWerqF2gmq1xZ-5VnCga3GNVTWOXnxqDc_IJo8G6s=s1000']) as string,
                name: 'Porsche Cayenne',
                description: '',
                attributes: [],
                contractAddress: '0x',
                tokenID: '1',
                owner: '0x',
                price: {
                    amount: '100',
                    currency: 'USDT'
                },
                status: NFTSaleStatus.FIXED_PRICE,
                collection: {
                    ID: '1',
                    name: 'GTA Cars'
                }
            })),
            total: 500
        };
    }

    const { data } = await api.post<{
        counts: number
        items: NFT[]
    }>('/token/get.list', params);

    return {
        items: data.items,
        total: data.counts
    };
}