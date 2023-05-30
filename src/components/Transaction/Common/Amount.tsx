import { formatTokenAmount } from '@/utils/formatTokenAmount';

type AmountProps = {
    amount: string
    currency: string
}

export function Amount({ amount, currency }: AmountProps) {
    return (
        <span style={{ color: 'var(--color-typo-base)', fontWeight: '600' }}>
            {formatTokenAmount(amount)} {currency}
        </span>
    );
}