import { formatFiatCurrency } from '@/utils/fiat';
import styles from './CurrencyRate.module.scss';
import { fiatCurrencies } from '@/config/constants/fiatCurrencies';
import { Skeleton } from '@/uikit';
import { useTranslation } from '@/localization';

type CurrencyRateProps = {
    rate: string
}

export function CurrencyRate({ rate }: CurrencyRateProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.rate}>
            <div className={styles.text}>
                {t('You get')} <span>1 TANPIN</span> {t('for')} <span>{formatFiatCurrency(rate, fiatCurrencies.rub.locale, fiatCurrencies.rub.code)}</span>
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