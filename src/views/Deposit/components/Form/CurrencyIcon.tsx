import rubLogo from '@/app/assets/images/rub.png';
import tanpinLogo from '@/app/assets/images/tanpin-coin.png';
import usdtPolygonLogo from '@/app/assets/images/usdt-polygon.png';
import usdtEthereumLogo from '@/app/assets/images/usdt-ethereum.png';
import usdtBscLogo from '@/app/assets/images/usdt-bsc.png';
import usdtTronLogo from '@/app/assets/images/usdt-tron.png';
import styles from './CurrencyIcon.module.scss';

const currencyIdToIcon = {
    'tanpin': tanpinLogo,
    'rub': rubLogo,
    'usdt-polygon': usdtPolygonLogo,
    'usdt-ethereum': usdtEthereumLogo,
    'usdt-bsc': usdtBscLogo,
    'usdt-tron': usdtTronLogo
};

type CurrencyIconProps = {
    currencyId: string
}

export function CurrencyIcon({ currencyId }: CurrencyIconProps) {
    return (
        <div className={styles.icon}>
            <img
                src={currencyIdToIcon[currencyId]}
                alt={currencyId}
            />
        </div>
    );
}