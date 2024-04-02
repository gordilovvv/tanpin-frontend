import { Currency } from '@/components/Currency';
import { useTranslation } from '@/localization';
import { formatTokenAmount, formatTokenAmountShort } from '@/utils/formatTokenAmount';
import { editionsSuffix, pluralize } from '@/utils/pluralize';

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
            return (<>{formatTokenAmountShort(value, locale)} / {formatTokenAmountShort(total, locale)} {t('on sale for each')} <span>{formatTokenAmount(price)} <Currency>{currency}</Currency></span></>);
        } else {
            return (<>{formatTokenAmountShort(value, locale)} / {formatTokenAmountShort(total, locale)} {t('on sale for')} <span>{formatTokenAmount(price)} <Currency>{currency}</Currency></span></>);
        }
    }

    return (<>{formatTokenAmountShort(total, locale)} {pluralize(total, locale, editionsSuffix)} {t('not for sale')}</>);
}