import { Currency, currencies, nativeCurrency } from '@/config/constants/currency';
import rub from '@/app/assets/images/rub.png';
import usdtPolygon from '@/app/assets/images/usdt-polygon.png';
import usdtEthereum from '@/app/assets/images/usdt-ethereum.png';
import usdtBsc from '@/app/assets/images/usdt-bsc.png';
import usdtTron from '@/app/assets/images/usdt-tron.png';
import classNames from 'classnames';
import styles from './CurrencyIcon.module.scss';

type CurrencyIconProps = {
    code: string,
    size?: 's' | 'm' // s - 18px, m - 24px
}

const images: { [code: string]: string } = {
    'rub': rub,
    'matic': nativeCurrency.image,
    'usdt-polygon': usdtPolygon,
    'usdt-ethereum': usdtEthereum,
    'usdt-bsc': usdtBsc,
    'usdt-tron': usdtTron
};

export function CurrencyIcon({ code, size = 's' }: CurrencyIconProps) {
    let currency = (currencies[code] as Currency | undefined)?.image;

    if (!currency) {
        currency = images[code];
    }

    return (
        <div className={classNames(styles.icon, styles[size])}>
            <img
                src={currency}
                alt={code}
            />
        </div>
    );
}