import rubLogo from '@/app/assets/images/rub.png';
import tanpinLogo from '@/app/assets/images/tanpin-coin.png';
import usdtPolygonLogo from '@/app/assets/images/usdt-polygon.png';
import usdtEthereumLogo from '@/app/assets/images/usdt-ethereum.png';
import usdtBscLogo from '@/app/assets/images/usdt-bsc.png';
import usdtTronLogo from '@/app/assets/images/usdt-tron.png';
import styles from './CurrencyIcon.module.scss';
import classNames from 'classnames';

const currencyByCode = {
    'tanpin': tanpinLogo,
    'rub': rubLogo,
    'usdt-polygon': usdtPolygonLogo,
    'usdt-ethereum': usdtEthereumLogo,
    'usdt-bsc': usdtBscLogo,
    'usdt-tron': usdtTronLogo
};

type CurrencyIconProps = {
    code: string,
    size?: 's' | 'm' // s - 18px, m - 24px
}

export function CurrencyIcon({ code, size = 's' }: CurrencyIconProps) {
    return (
        <div className={classNames(styles.icon, styles[size])}>
            <img
                src={currencyByCode[code]}
                alt={code}
            />
        </div>
    );
}