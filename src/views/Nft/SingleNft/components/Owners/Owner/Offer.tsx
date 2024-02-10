import { useTranslation } from '@/localization';
import { formatTokenAmount, formatTokenAmountShort } from '@/utils/formatTokenAmount';

type OfferProps = {
    value?: number
    price?: string
    currency?: string
    total: number
}

export function Offer({ value, price, currency, total }: OfferProps) {
    const { t, locale } = useTranslation();

    if (value && price && currency) {
        if (value > 1) {
            return (<>{formatTokenAmountShort(value, locale)} / {formatTokenAmountShort(total, locale)} {t('on sale for each')} <span>{formatTokenAmount(price)} {currency}</span></>);
        } else {
            return (<>{formatTokenAmountShort(value, locale)} / {formatTokenAmountShort(total, locale)} {t('on sale for')} <span>{formatTokenAmount(price)} {currency}</span></>);
        }
    }

    return (<>{formatTokenAmountShort(total, locale)} {t('not for sale')}</>);
}