import { polygon, polygonMumbai } from 'wagmi/chains';

export const CONTRACTS = {
    usdt: {
        [polygon.id]: {
            address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            decimals: 6
        },
        [polygonMumbai.id]: {
            address: '0x5E4f0639795a01f30f609612599dc81889630135',
            decimals: 18
        }
    }
};