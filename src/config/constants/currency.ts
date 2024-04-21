import { CONTRACTS } from './contracts';
import { activeChainId } from '../chain';
import tanpinLogo from '@/app/assets/images/tanpin-coin.png';
import usdtLogo from '@/app/assets/images/usdt.png';
import maticLogo from '@/app/assets/images/matic.png';

export type Currency = {
    id: string,
    name: string,
    symbol: string,
    address: `0x${string}`,
    decimals: number,
    image: string
}

export const currencies: Record<'tanpin' | 'usdt', Currency> = {
    tanpin: {
        id: 'tanpin',
        name: 'Tanpin',
        symbol: 'TANPIN',
        address: CONTRACTS.tanpin[activeChainId].address,
        decimals: CONTRACTS.tanpin[activeChainId].decimals,
        image: tanpinLogo
    },
    usdt: {
        id: 'usdt',
        name: 'Tether USD',
        symbol: 'USDT',
        address: CONTRACTS.usdt[activeChainId].address,
        decimals: CONTRACTS.usdt[activeChainId].decimals,
        image: usdtLogo
    }
};

export type NativeCurrency = {
    id: string,
    name: string,
    symbol: string,
    decimals: number,
    image: string
}

export const nativeCurrency: NativeCurrency = {
    id: 'matic',
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    image: maticLogo
};