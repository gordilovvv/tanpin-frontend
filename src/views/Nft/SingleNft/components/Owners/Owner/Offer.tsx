import { formatTokenAmount, formatTokenAmountShort } from '@/utils/formatTokenAmount';

type OfferProps = {
    value?: number
    price?: string
    currency?: string
    total: number
}

export function Offer({ value, price, currency, total }: OfferProps) {
    if (value && price && currency) {
        if (value > 1) {
            return (<>{formatTokenAmountShort(value)} / {formatTokenAmountShort(total)} on sale for each <span>{formatTokenAmount(price)} {currency}</span></>);
        } else {
            return (<>{formatTokenAmountShort(value)} / {formatTokenAmountShort(total)} on sale for <span>{formatTokenAmount(price)} {currency}</span></>);
        }
    }

    return (<>{formatTokenAmountShort(total)} not for sale</>);
}