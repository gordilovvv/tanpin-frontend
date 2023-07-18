import { formatFiatCurrency } from '@/utils/fiat';
import styles from './CurrencyRate.module.scss';
import { fiatCurrencies } from '@/config/constants/fiatCurrencies';
import { Skeleton } from '@/uikit';

type CurrencyRateProps = {
    rate: string
}

export function CurrencyRate({ rate }: CurrencyRateProps) {
    return (
        <div className={styles.rate}>
            <div className={styles.text}>
                You get <span>1 USDT</span> for <span>{formatFiatCurrency(rate, fiatCurrencies.rub.locale, fiatCurrencies.rub.code)}</span>
            </div>
        </div>
    );
}

export function CurrencyRateSkeleton() {
    return (
        <div className={styles.rate}>
            <Skeleton className={styles.rateSkeleton} />
        </div>
    );
}