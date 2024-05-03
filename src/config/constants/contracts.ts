import { Address } from 'viem';
import { polygon } from 'wagmi/chains';
import { polygonAmoy } from '../chain';

export const CONTRACTS = {
    usdt: {
        [polygon.id]: {
            address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as Address,
            decimals: 6
        },
        [polygonAmoy.id]: {
            address: '0xeaa2b2b085a6e03854b73102b4cd9bed34f84a5e' as Address,
            decimals: 6
        }
    },
    tanpin: {
        [polygon.id]: {
            address: '0xd9D77B113e6Ef2696267E20C35f3AbD87cdaca2c' as Address,
            decimals: 18
        },
        [polygonAmoy.id]: {
            address: '0x3d58ca284c679eb4979e71a3901dddc977bcccda' as Address, // Not deployed
            decimals: 18
        }
    },
    market: {
        [polygon.id]: '0x6b4AD3bEB045a3ed412C47611c9C18AA6ae0405d' as Address,
        [polygonAmoy.id]: '0x5E4f0639795a01f30f609612599dc81889630135' as Address
    },
    ERC1155: {
        [polygon.id]: '0x5D7e5b6523D709D9F95b2b9EFd52AFb6d8D48d81' as Address,
        [polygonAmoy.id]: '0x95ACD91Fa920C8ff66304dD40aed6c848D001103' as Address
    },
    locker: {
        [polygon.id]: '0x76633f10d2BEA5684794a6c85A26C513069b9738' as Address,
        [polygonAmoy.id]: '0x' as Address // Not deployed
    }
};