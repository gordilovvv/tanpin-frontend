import { currencyToLogo } from '@/config/constants/currency';
import classNames from 'classnames';
import styles from './CurrencyIcon.module.scss';

type CurrencyIconProps = {
    code: string,
    size?: 's' | 'm' // s - 18px, m - 24px
}

export function CurrencyIcon({ code, size = 's' }: CurrencyIconProps) {
    return (
        <div className={classNames(styles.icon, styles[size])}>
            <img
                src={currencyToLogo[code]}
                alt={code}
            />
        </div>
    );
}