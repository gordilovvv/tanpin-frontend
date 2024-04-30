import { Currency } from '@/components/Currency';
import { formatTokenAmount } from '@/utils/formatTokenAmount';

type PriceProps = {
    amount: number
    price: string
    currency: string
}

export function Price({ amount, price, currency }: PriceProps) {
    const totalPrice = amount * parseFloat(price);

    return (
        <span style={{ color: 'var(--color-typo-base)', fontWeight: '600' }}>
            {formatTokenAmount(totalPrice)} <Currency>{currency}</Currency>
        </span>
    );
}