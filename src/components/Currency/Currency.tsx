import { currencies } from '@/config/constants/currency';
import { HTMLAttributes, ReactNode } from 'react';

type CurrencyProps = {
    as?: 'span' | 'div';
    children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function Currency({ as: Tag = 'span', children, ...props }: CurrencyProps) {
    if (typeof children !== 'string') {
        throw new Error('Currency should be string');
    }

    const currency = currencies[children];

    if (!currency) {
        throw new Error(`Unknown currency ${currency}`);
    }

    return <Tag {...props}>{currency.symbol}</Tag>;
}