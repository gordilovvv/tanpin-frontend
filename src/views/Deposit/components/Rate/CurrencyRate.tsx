import { Skeleton } from '@/uikit';
import { InputCurrency } from '@/states/deposit/types';
import { useTranslation } from '@/localization';
import { fiatCurrencies } from '@/config/constants/fiatCurrencies';
import { isTokenCurrency } from '../../utils/isToken';
import { formatFiatCurrency } from '@/utils/fiat';
import { formatTokenAmountV2 } from '@/utils/formatTokenAmount';
import styles from './CurrencyRate.module.scss';

type CurrencyRateProps = {
    rate: string,
    currency: InputCurrency
}

export function CurrencyRate({ rate, currency }: CurrencyRateProps) {
    const { t } = useTranslation();
    const isToken = isTokenCurrency(currency);

    const formattedRate = isToken
        ? formatTokenAmountV2(rate, fiatCurrencies.rub.locale, currency.symbol)
        : formatFiatCurrency(rate, fiatCurrencies.rub.locale, currency.id);

    return (
        <div className={styles.rate}>
            <div className={styles.text}>
                {t('You get')} <span>1 TANPIN</span> {t('for')} <span>{formattedRate}</span>
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