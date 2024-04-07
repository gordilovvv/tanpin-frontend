import { Currency, currencies, nativeCurrency } from '@/config/constants/currency';
import classNames from 'classnames';
import styles from './CurrencyIcon.module.scss';

type CurrencyIconProps = {
    code: string,
    size?: 's' | 'm' // s - 18px, m - 24px
}

const images: { [code: string]: string } = {
    'rub': 'https://cdn.tanpin.io/currency/rub.png',
    'matic': nativeCurrency.image,
    'usdt-polygon': 'https://cdn.tanpin.io/currency/usdt-polygon.png',
    'usdt-ethereum': 'https://cdn.tanpin.io/currency/usdt-ethereum.png',
    'usdt-bsc': 'https://cdn.tanpin.io/currency/usdt-bsc.png',
    'usdt-tron': 'https://cdn.tanpin.io/currency/usdt-tron.png'
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