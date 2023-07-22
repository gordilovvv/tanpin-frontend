import { Address } from 'viem';
import { polygon, polygonMumbai } from 'wagmi/chains';

export const CONTRACTS = {
    usdt: {
        [polygon.id]: {
            address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as Address,
            decimals: 6
        },
        [polygonMumbai.id]: {
            address: '0x415A507edBabA701589c713152c3d232BbfE81a9' as Address,
            decimals: 6
        }
    },
    market: {
        [polygon.id]: '0x6b4AD3bEB045a3ed412C47611c9C18AA6ae0405d' as Address,
        [polygonMumbai.id]: '0x5e687642685E3c221364C570e6c4a84A66907ECe' as Address
    },
    ERC1155: {
        [polygon.id]: '0x5D7e5b6523D709D9F95b2b9EFd52AFb6d8D48d81' as Address,
        [polygonMumbai.id]: '0x096eCA74eB4ebc59addA3Cf3edF860523c7F0C28' as Address
    }
};