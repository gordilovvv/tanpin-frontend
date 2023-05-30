import { polygon, polygonMumbai } from 'wagmi/chains';

export const CONTRACTS = {
    usdt: {
        [polygon.id]: {
            address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            decimals: 6
        },
        [polygonMumbai.id]: {
            address: '0x415A507edBabA701589c713152c3d232BbfE81a9',
            decimals: 6
        }
    },
    market: {
        [polygon.id]: '',
        [polygonMumbai.id]: '0x5e687642685E3c221364C570e6c4a84A66907ECe'
    },
    ERC1155: {
        [polygon.id]: '',
        [polygonMumbai.id]: '0x4690b3f9013770e283fed8b765a625adc4372a03'
    }
};