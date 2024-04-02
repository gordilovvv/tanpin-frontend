import tanpinLogo from '@/app/assets/images/tanpin-coin.png';
import usdtLogo from '@/app/assets/images/usdt.png';
import rubLogo from '@/app/assets/images/rub.png';
import usdtPolygonLogo from '@/app/assets/images/usdt-polygon.png';
import usdtEthereumLogo from '@/app/assets/images/usdt-ethereum.png';
import usdtBscLogo from '@/app/assets/images/usdt-bsc.png';
import usdtTronLogo from '@/app/assets/images/usdt-tron.png';

export const currencies: {
    [currency: string]: {
        name: string,
        symbol: string,
        decimals: number,
        image: string
    }
} = {
    tanpin: {
        name: 'Tanpin',
        symbol: 'TANPIN',
        decimals: 18,
        image: tanpinLogo
    },
    usdt: {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 18,
        image: usdtLogo
    }
};

export const currencyToLogo: {
    [currency: string]: string
} = {
    'tanpin': tanpinLogo,
    'rub': rubLogo,
    'usdt-polygon': usdtPolygonLogo,
    'usdt-ethereum': usdtEthereumLogo,
    'usdt-bsc': usdtBscLogo,
    'usdt-tron': usdtTronLogo
};